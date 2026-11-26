"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  APP_CONFIRMATION_URL, confirmationCopy, parseConfirmation, verifyConfirmation,
  type ConfirmationResult,
} from "@/lib/email-confirmation";

export function EmailConfirmedClient() {
  const captured = useRef<ConfirmationResult | null>(null);
  const [result, setResult] = useState<ConfirmationResult>({
    status: "checking", appLink: APP_CONFIRMATION_URL,
  });

  useEffect(() => {
    let active = true;
    // Retain the parsed result across React Strict Mode's effect replay.
    if (!captured.current) {
      captured.current = parseConfirmation(window.location.search, window.location.hash);
      // Remove credentials from the address bar/history before any handoff.
      window.history.replaceState(window.history.state, "", window.location.pathname);
    }
    const callback = captured.current;
    setResult(callback);
    void verifyConfirmation(callback, {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    }).then((verified) => { if (active) setResult(verified); });
    return () => { active = false; };
  }, []);

  const copy = confirmationCopy[result.status];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div className="section-heading center" role="status" aria-live="polite">
        <span className="eyebrow">Email confirmation</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
      <Button href={result.appLink} rel="noreferrer">Open MRI Plan</Button>
      <p style={{ textAlign: "center" }}>
        If the app doesn’t open, open MRI Plan manually on your phone and sign in
        with the email address you registered. If the link has expired or was
        already used, signing in will check your current account status.
      </p>
    </div>
  );
}
