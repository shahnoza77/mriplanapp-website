import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Email confirmed",
  description: "Your MRI Plan account email has been verified.",
  alternates: { canonical: "/email-confirmed" },
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button href={site.url}>Go to MRI Plan</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
