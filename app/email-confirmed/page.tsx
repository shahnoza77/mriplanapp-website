import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { EmailConfirmedClient } from "./EmailConfirmedClient";

export const metadata: Metadata = {
  ...pageMetadata("/email-confirmed", "Email confirmation", "Check your MRI Plan email confirmation and return to the app."),
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function EmailConfirmedPage() {
  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <EmailConfirmedClient />
          <noscript>
            JavaScript is needed to check this confirmation result. Open MRI Plan
            manually and sign in with the email address you registered.
          </noscript>
        </Reveal>
      </div>
    </section>
  );
}
