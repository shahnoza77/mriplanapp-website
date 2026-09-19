import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { EmailConfirmedClient } from "./EmailConfirmedClient";

export const metadata: Metadata = {
  ...pageMetadata("/email-confirmed", "Email confirmed", "Your MRI Plan account email has been verified."),
  robots: { index: false, follow: false },
};

export default function EmailConfirmedPage() {
  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <div className="section-heading center">
            <span className="eyebrow">Verified</span>
            <h1>Your email has been verified</h1>
            <p>Your MRI Plan account is now confirmed. You can return to the MRI Plan app and sign in.</p>
          </div>
          <EmailConfirmedClient />
        </Reveal>
      </div>
    </section>
  );
}
