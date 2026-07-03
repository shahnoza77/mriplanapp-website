import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { faqItems } from "@/data/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about MRI Plan, including who it is for, launch timing, pricing, privacy, and scope.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.slice(0, 5).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs current="FAQ" />
          <h1>Frequently asked questions</h1>
          <p>Everything currently confirmed about MRI Plan before launch.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: "860px" }}>
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
