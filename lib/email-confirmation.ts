// No browser session is persisted here. PKCE exchange belongs to the mobile
// client that created the verifier. Only GET /auth/v1/user can prove success.
export const APP_CONFIRMATION_URL = "com.example.mriplanningapp://auth/email-confirmed";
export type ConfirmationStatus = "missing" | "invalid" | "pending" | "checking" | "success" | "unverified" | "unavailable";
export type ConfirmationResult = {
  status: ConfirmationStatus;
  appLink: string;
  accessToken?: string;
};

const callbackKeys = new Set([
  "code", "access_token", "refresh_token", "expires_in", "expires_at", "token_type", "type",
  "error", "error_code", "error_description",
]);
const invalid = (): ConfirmationResult => ({ status: "invalid", appLink: APP_CONFIRMATION_URL });

export function parseConfirmation(search: string, hash: string): ConfirmationResult {
  if (search.length + hash.length > 32768 || /%(?![a-f\d]{2})/i.test(search + hash)) return invalid();
  const params = new URLSearchParams();
  for (const source of [search.replace(/^\?/, ""), hash.replace(/^#/, "")]) {
    for (const [key, value] of new URLSearchParams(source)) {
      if (!callbackKeys.has(key)) continue; // Never forward arbitrary redirects or tracking data.
      if (params.has(key) || /[\u0000-\u0020\u007f\ufffd]/.test(value)) return invalid();
      params.set(key, value);
    }
  }
  // Errors take precedence, even if tokens/code are also supplied. Never render
  // untrusted error_description text or forward a recovery callback as signup.
  if (["error", "error_code", "error_description"].some((key) => params.has(key))) return invalid();
  const type = params.get("type");
  if (type !== null && !["signup", "email", "email_change"].includes(type)) return invalid();
  if (params.has("code")) {
    const code = params.get("code")!;
    if (!/^[a-z\d._~-]{1,4096}$/i.test(code) ||
        ["access_token", "refresh_token", "expires_in", "expires_at", "token_type"].some((key) => params.has(key))) return invalid();
    // A URL code alone is not proof that the account has been confirmed.
    return { status: "pending", appLink: `${APP_CONFIRMATION_URL}?${new URLSearchParams({ code })}` };
  }
  const tokenKeys = ["access_token", "refresh_token", "expires_in", "expires_at", "token_type"];
  if (!tokenKeys.some((key) => params.has(key))) return { status: "missing", appLink: APP_CONFIRMATION_URL };
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const expiresIn = params.get("expires_in") ?? "";
  if (!accessToken || !refreshToken || params.get("token_type")?.toLowerCase() !== "bearer" ||
      !/^\d+$/.test(expiresIn) || !Number.isSafeInteger(Number(expiresIn)) || Number(expiresIn) <= 0) return invalid();
  if (params.has("expires_at") && !/^\d+$/.test(params.get("expires_at")!)) return invalid();
  // Canonicalize implicit parameters into the fragment, including parameters
  // originally split across query + fragment. The SDK accepts this format.
  return { status: "checking", appLink: `${APP_CONFIRMATION_URL}#${params}`, accessToken };
}

export async function verifyConfirmation(
  result: ConfirmationResult,
  config: { supabaseUrl?: string; publishableKey?: string },
  request: typeof fetch = fetch,
): Promise<ConfirmationResult> {
  if (result.status !== "checking" || !result.accessToken) return result;
  const { accessToken, ...safeResult } = result;
  const unavailable = { ...safeResult, status: "unavailable" as const };
  if (!config.supabaseUrl || !config.publishableKey) return unavailable;
  try {
    const base = new URL(config.supabaseUrl);
    if (base.protocol !== "https:" || base.username || base.password || base.search || base.hash || base.pathname !== "/") return unavailable;
    const response = await request(new URL("/auth/v1/user", base), {
      headers: { apikey: config.publishableKey, Authorization: `Bearer ${accessToken}` },
      cache: "no-store", credentials: "omit", redirect: "error",
      referrerPolicy: "no-referrer", signal: AbortSignal.timeout(10000),
    });
    if (response.status === 401 || response.status === 403) return invalid();
    if (!response.ok) return unavailable;
    const user = await response.json();
    if (!user || typeof user.id !== "string" || !user.id || typeof user.email !== "string" || !user.email) return unavailable;
    if (typeof user.email_confirmed_at === "string" && Number.isFinite(Date.parse(user.email_confirmed_at))) {
      return { ...safeResult, status: "success" };
    }
    // Deliberately ignore confirmed_at and user_metadata: neither proves email confirmation.
    return { status: "unverified", appLink: APP_CONFIRMATION_URL };
  } catch {
    // No tokens, URLs, or server responses are logged or stored.
    return unavailable;
  }
}

export const confirmationCopy: Record<ConfirmationStatus, { title: string; description: string }> = {
  missing: {
    title: "No verification result found",
    description: "Open the confirmation link from your email. If you already confirmed it, return to MRI Plan and sign in with that same email address.",
  },
  invalid: {
    title: "This confirmation link is invalid or expired",
    description: "Use the latest confirmation email. If it no longer works, request a new verification email in MRI Plan. If you already confirmed your email, try signing in.",
  },
  pending: {
    title: "Continue in MRI Plan",
    description: "The app needs to securely check this confirmation result. Open MRI Plan on the device where you registered. This page cannot yet confirm your verification status.",
  },
  checking: {
    title: "Checking your email verification",
    description: "Please wait while we check the result securely with MRI Plan’s authentication service.",
  },
  success: {
    title: "Your email has been verified",
    description: "Your email confirmation was checked with MRI Plan’s authentication service. Open MRI Plan and continue with the same email address.",
  },
  unverified: {
    title: "Email verification is still required",
    description: "The authentication service has not confirmed this email address. Use the latest confirmation email or request a new one in MRI Plan.",
  },
  unavailable: {
    title: "We couldn’t check your verification status",
    description: "Open MRI Plan to continue securely, or try again from the email link. This page has not confirmed that your email is verified.",
  },
};
