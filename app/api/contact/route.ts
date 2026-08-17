import { contactTopics, site } from "@/data/content";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CONTACT_FROM = `MRI Plan Website <${site.email}>`;
const MAX_REQUEST_BYTES = 8_192;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const topicLabels = new Map(contactTopics.map((topic) => [topic.value, topic.label]));

type ContactPayload = {
  company?: unknown;
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  submissionId?: unknown;
};

function jsonResponse(body: { ok: boolean }, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ ok: false }, 413);
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = await request.json();
  } catch {
    return jsonResponse({ ok: false }, 400);
  }

  if (!parsedPayload || typeof parsedPayload !== "object" || Array.isArray(parsedPayload)) {
    return jsonResponse({ ok: false }, 400);
  }

  const payload = parsedPayload as ContactPayload;

  if (JSON.stringify(payload).length > MAX_REQUEST_BYTES) {
    return jsonResponse({ ok: false }, 413);
  }

  const company = readString(payload.company);
  if (company) {
    return jsonResponse({ ok: true }, 200);
  }

  const name = readString(payload.name);
  const email = readString(payload.email);
  const topic = readString(payload.topic);
  const message = readString(payload.message).replace(/\r\n/g, "\n");
  const submissionId = readString(payload.submissionId);
  const topicLabel = topicLabels.get(topic);

  const isValid =
    name.length >= 2 &&
    name.length <= 100 &&
    !/[\r\n]/.test(name) &&
    email.length <= 254 &&
    EMAIL_PATTERN.test(email) &&
    !/[\r\n]/.test(email) &&
    Boolean(topicLabel) &&
    message.length >= 10 &&
    message.length <= 5_000 &&
    UUID_PATTERN.test(submissionId);

  if (!isValid || !topicLabel) {
    return jsonResponse({ ok: false }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse({ ok: false }, 500);
  }

  const submittedAt = new Date().toISOString();
  const emailText = [
    "New MRI Plan website message",
    "",
    `Full Name: ${name}`,
    `Email Address: ${email}`,
    `Topic: ${topicLabel}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": submissionId,
        "User-Agent": "MRI Plan Website/1.0",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [site.email],
        reply_to: email,
        subject: `[MRI Plan Website] ${topicLabel} — ${name}`,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      return jsonResponse({ ok: false }, 502);
    }

    return jsonResponse({ ok: true }, 200);
  } catch {
    return jsonResponse({ ok: false }, 502);
  }
}
