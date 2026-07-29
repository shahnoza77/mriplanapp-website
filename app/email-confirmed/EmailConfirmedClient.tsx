"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/// Custom URL scheme registered by the MRI Plan iOS/Android app
/// (see ios/Runner/Info.plist CFBundleURLSchemes) — the same scheme already
/// used for the working password-recovery deep link
/// (com.example.mriplanningapp://auth/recovery). A distinct path,
/// auth/email-confirmed, keeps this callback from ever being mistaken for
/// a recovery link by the app's own link classifier.
const APP_SCHEME = "com.example.mriplanningapp";
const APP_CALLBACK_PATH = "auth/email-confirmed";

/// Builds the deep link the app can act on, forwarding Supabase's own
/// confirmation params (PKCE `code`, or an implicit-flow `access_token` /
/// `refresh_token` pair, or an `error`/`error_description`) exactly as
/// received — never inventing or duplicating token values, and never
/// logging them.
function buildAppLink(): string | null {
  if (typeof window === "undefined") return null;
  const query = window.location.search; // e.g. "?code=..."
  const fragment = window.location.hash; // e.g. "#access_token=..."
  const forwarded = query || fragment;
  if (!forwarded) return null;
  return `${APP_SCHEME}://${APP_CALLBACK_PATH}${forwarded}`;
}

export function EmailConfirmedClient() {
  const [appLink, setAppLink] = useState<string | null>(null);

  useEffect(() => {
    setAppLink(buildAppLink());
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button href={appLink ?? "#"}>Open MRI Plan</Button>
      </div>
      <p style={{ textAlign: "center" }}>
        Your email has been verified. Open the MRI Plan app and sign in to continue.
      </p>
    </div>
  );
}
