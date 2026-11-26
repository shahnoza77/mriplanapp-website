import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {
  APP_CONFIRMATION_URL, parseConfirmation, verifyConfirmation, confirmationCopy,
} from "../lib/email-confirmation.ts";

const implicit = "access_token=test-access&refresh_token=test-refresh&expires_in=3600&token_type=bearer&type=signup";
const config = { supabaseUrl: "https://project.supabase.co", publishableKey: "sb_publishable_test" };
const confirmed = { id: "user-1", email: "test@example.com", email_confirmed_at: "2026-11-23T18:00:00Z" };
const response = (body, status = 200) => new Response(JSON.stringify(body), { status });

test("missing result and arbitrary success flags never claim success; fallback opens the app", () => {
  for (const search of ["", "?success=true", "?verified=true&redirect_to=https://evil.example"]) {
    assert.deepEqual(parseConfirmation(search, ""), { status: "missing", appLink: APP_CONFIRMATION_URL });
  }
});

test("PKCE in query or fragment is handed to the mobile verifier, without claiming success", async () => {
  for (const [search, hash] of [["?code=valid-code", ""], ["?utm_source=email", "#code=valid-code"]]) {
    const result = parseConfirmation(search, hash);
    assert.equal(result.status, "pending");
    assert.equal(result.appLink, `${APP_CONFIRMATION_URL}?code=valid-code`);
    assert.equal(await verifyConfirmation(result, config, () => assert.fail("must not exchange code in browser")), result);
  }
});

test("implicit results retain query and fragment parameters in an SDK-compatible fragment", () => {
  const result = parseConfirmation("?type=signup&expires_in=3600", "#access_token=test-access&refresh_token=test-refresh&token_type=bearer");
  assert.equal(result.status, "checking");
  const url = new URL(result.appLink);
  assert.equal(url.search, "");
  const params = new URLSearchParams(url.hash.slice(1));
  assert.equal(params.get("access_token"), "test-access");
  assert.equal(params.get("refresh_token"), "test-refresh");
  assert.equal(params.get("expires_in"), "3600");
  assert.equal(params.get("type"), "signup");
});

test("allowlist excludes arbitrary URLs and provider tokens; values are safely encoded", () => {
  const result = parseConfirmation("?redirect_to=https://evil.example&provider_token=private", `#${implicit}`);
  assert.equal(result.status, "checking");
  assert.ok(!result.appLink.includes("evil"));
  assert.ok(!result.appLink.includes("private"));
  assert.equal(parseConfirmation("?code=hello%26redirect_to%3Dhttps%3A%2F%2Fevil.example", "").status, "invalid");
});

for (const [name, search, hash] of [
  ["expired query", "?error=access_denied&error_code=otp_expired", ""],
  ["expired fragment", "", "#error_code=otp_expired"],
  ["error overrides code", "?code=abc", "#error_description=expired"],
  ["error overrides implicit tokens", "?error=access_denied", `#${implicit}`],
  ["empty error", "?error=", ""],
  ["duplicate query code", "?code=abc&code=def", ""],
  ["duplicate across query and fragment", "?code=abc", "#code=abc"],
  ["mixed code and tokens", "?code=abc", `#${implicit}`],
  ["missing refresh token", "", "#access_token=test-access"],
  ["empty code", "?code=", ""],
  ["malformed encoding", "?code=%zz", ""],
  ["invalid utf8", "?code=%FF", ""],
  ["control characters", "?code=abc%0D%0AHeader", ""],
  ["oversized input", `?code=${"x".repeat(33000)}`, ""],
  ["recovery callback", "?code=abc&type=recovery", ""],
  ["recovery token", "", `#${implicit.replace("signup", "recovery")}`],
  ["invalid lifetime", "", `#${implicit.replace("3600", "-1")}`],
  ["invalid token type", "", `#${implicit.replace("bearer", "basic")}`],
]) {
  test(`${name} is invalid and forwards no credentials`, () => {
    assert.deepEqual(parseConfirmation(search, hash), { status: "invalid", appLink: APP_CONFIRMATION_URL });
  });
}

test("success requires a fresh authenticated Supabase user lookup", async () => {
  let calls = 0;
  const result = await verifyConfirmation(parseConfirmation("", `#${implicit}`), config, async (url, options) => {
    calls++;
    assert.equal(String(url), "https://project.supabase.co/auth/v1/user");
    assert.equal(options.headers.Authorization, "Bearer test-access");
    assert.equal(options.headers.apikey, "sb_publishable_test");
    assert.equal(options.cache, "no-store");
    assert.equal(options.credentials, "omit");
    assert.equal(options.redirect, "error");
    assert.equal(options.referrerPolicy, "no-referrer");
    assert.ok(options.signal instanceof AbortSignal);
    assert.ok(!JSON.stringify(options).includes("test-refresh"));
    return response(confirmed);
  });
  assert.equal(calls, 1);
  assert.equal(result.status, "success");
  assert.ok(!("accessToken" in result));
});

test("user metadata, general confirmed_at, and an unverified user cannot prove email confirmation", async () => {
  for (const user of [
    { ...confirmed, email_confirmed_at: null },
    { id: "user", email: "test@example.com", confirmed_at: confirmed.email_confirmed_at, user_metadata: { email_verified: true } },
    { ...confirmed, email_confirmed_at: "not-a-date" },
  ]) {
    const result = await verifyConfirmation(parseConfirmation("", `#${implicit}`), config, async () => response(user));
    assert.deepEqual(result, { status: "unverified", appLink: APP_CONFIRMATION_URL });
  }
});

test("expired/invalid access tokens produce an invalid result without a token handoff", async () => {
  for (const status of [401, 403]) {
    assert.deepEqual(await verifyConfirmation(parseConfirmation("", `#${implicit}`), config, async () => response({}, status)),
      { status: "invalid", appLink: APP_CONFIRMATION_URL });
  }
});

test("network failures, rate limits and malformed server responses never claim success", async () => {
  for (const request of [
    async () => { throw new Error("offline"); },
    async () => { throw new DOMException("timeout", "TimeoutError"); },
    async () => response({}, 429),
    async () => response({}, 500),
    async () => new Response("not json"),
    async () => response({ email_confirmed_at: confirmed.email_confirmed_at }),
  ]) {
    assert.equal((await verifyConfirmation(parseConfirmation("", `#${implicit}`), config, request)).status, "unavailable");
  }
});

test("missing or unsafe configuration fails closed without making a network request", async () => {
  for (const settings of [{}, { supabaseUrl: config.supabaseUrl }, { ...config, supabaseUrl: "http://project.supabase.co" }, { ...config, supabaseUrl: "https://user:pass@project.supabase.co" }]) {
    const result = await verifyConfirmation(parseConfirmation("", `#${implicit}`), settings, () => assert.fail("must not fetch"));
    assert.equal(result.status, "unavailable");
  }
});

test("only the server-confirmed state displays the success heading", () => {
  for (const [state, copy] of Object.entries(confirmationCopy)) {
    assert.equal(copy.title === "Your email has been verified", state === "success");
  }
  const page = readFileSync(new URL("../app/email-confirmed/page.tsx", import.meta.url), "utf8");
  assert.ok(!page.includes("Your email has been verified"));
  assert.ok(page.includes('referrer: "no-referrer"'));
});
