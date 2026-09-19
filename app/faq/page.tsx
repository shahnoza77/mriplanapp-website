import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { faqItems } from "@/data/content";

export const metadata: Metadata = {
  ...pageMetadata("/faq", "MRI Planning App FAQ", "Answers about the MRI Plan simulator app for students and technologists, including planning modules, educational scope, platforms, privacy, pricing, and support."),
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
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
          <Breadcrumbs path="/faq" current="FAQ" />
          <h1>Frequently asked questions</h1>
          <p>Everything currently confirmed about MRI Plan.</p>
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
