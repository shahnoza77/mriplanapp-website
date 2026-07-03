import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ModuleVisual } from "@/components/ui/ModuleVisual";
import { modules, site } from "@/data/content";

type ModulePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return modules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const planningModule = modules.find((item) => item.slug === slug);
  if (!planningModule) return {};

  return {
    title: planningModule.title,
    description: planningModule.summary,
    alternates: { canonical: `/modules/${planningModule.slug}` },
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const planningModule = modules.find((item) => item.slug === slug);
  if (!planningModule) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: planningModule.title,
    description: planningModule.summary,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="container split-layout">
          <div>
            <Breadcrumbs current={planningModule.title} parent={{ label: "Features", href: "/features" }} />
            <span className="eyebrow">{planningModule.status}</span>
            <h1>{planningModule.title}</h1>
            <p>{planningModule.description}</p>
          </div>
          <ModuleVisual label={planningModule.title} />
        </div>
      </section>
      <section className="section">
        <div className="container grid two">
          <div className="card">
            <h2>Planning focus</h2>
            <ul className="detail-list">
              {planningModule.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2>What is included</h2>
            <ul className="detail-list">
              {planningModule.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="section-heading center">
            <span className="eyebrow">Educational scope</span>
            <h2>This module is for practice, not clinical decisions</h2>
            <p>
              MRI Plan does not replace institutional protocols, formal instruction, scanner vendor guidance, or clinical
              supervision. It is a low-stakes practice environment for planning fundamentals.
            </p>
          </div>
        </div>
      </section>
      <FinalCta
        title={`Get updates on ${planningModule.title.toLowerCase()}`}
        text="Leave your email to follow MRI Plan development and launch availability."
      />
    </>
  );
}
