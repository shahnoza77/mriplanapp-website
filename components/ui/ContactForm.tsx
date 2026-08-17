"use client";

import { FormEvent, useRef, useState } from "react";
import { contactTopics, site } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "error" | "loading" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submittingRef = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();

    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!topic) nextErrors.topic = "Please choose a topic.";
    if (body.length < 10) nextErrors.message = "Please provide a few more details.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setMessage("Please correct the highlighted fields and try again.");
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data.entries()),
          submissionId: crypto.randomUUID(),
        }),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || result?.ok !== true) throw new Error("Form submission failed");

      form.reset();
      setErrors({});
      setStatus("success");
      setMessage("Thanks for reaching out. Your message has been sent.");
    } catch {
      setStatus("error");
      setMessage(`We couldn’t send your message right now. Please try again, or email ${site.email}.`);
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {message ? (
        <div className={`form-status ${status}`} role="status" aria-live="polite">
          {message}
        </div>
      ) : null}

      <Field id="name" label="Full name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" maxLength={100} />
      </Field>

      <div className="form-grid">
        <Field id="email" label="Email address" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} />
        </Field>
        <Field id="topic" label="Topic" error={errors.topic}>
          <select id="topic" name="topic" defaultValue="">
            <option value="" disabled>
              Select a topic
            </option>
            {contactTopics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message} hint="Minimum 10 characters. No need for formality.">
        <textarea id="message" name="message" rows={6} maxLength={5000} />
      </Field>

      <Button full type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  error,
  hint,
}: {
  id: string;
  label: string;
  children: React.ReactElement;
  error?: string;
  hint?: string;
}) {
  return (
    <div className={`form-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
      {error ? <span className="field-error">{error}</span> : null}
    </div>
  );
}
