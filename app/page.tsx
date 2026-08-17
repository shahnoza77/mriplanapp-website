import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { ModuleShowcase } from "@/components/sections/ModuleShowcase";
import { Process } from "@/components/sections/Process";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { faqItems, site } from "@/data/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "MRI Plan",
    url: site.url,
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS, Android",
    description: site.shortDescription,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <Hero />
      <TrustStrip />
      <FeatureGrid />
      <ModuleShowcase />
      <section className="section why-section">
        <div className="container split-layout">
          <div className="section-heading">
            <span className="eyebrow">Why MRI Plan</span>
            <h2>Practice that matches how planning actually works</h2>
            <p>
              The simulator is built from real technologist experience, with the pressure removed so learners can repeat
              spatial decisions until the planning logic clicks.
            </p>
          </div>
          <div className="insight-list">
            <article>
              <h3>Made by someone who scans patients</h3>
              <p>MRI Plan is created by a practicing MRI technologist, so the learning focus reflects console-level planning judgment.</p>
            </article>
            <article>
              <h3>Education-first, privacy-first</h3>
              <p>It is a training simulator, not a clinical device, and it does not collect, store, process, or transmit PHI.</p>
            </article>
            <article>
              <h3>Built for repeatable learning</h3>
              <p>Students can practice positioning, angling, coverage, and field of view without patient time or scan-room pressure.</p>
            </article>
          </div>
        </div>
      </section>
      <Process />
      <section className="section band">
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="section-heading center">
            <span className="eyebrow">Questions</span>
            <h2>Frequently asked questions</h2>
          </div>
          <Accordion items={faqItems.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
