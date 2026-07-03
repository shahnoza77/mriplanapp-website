import type { Metadata } from "next";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ModuleShowcase } from "@/components/sections/ModuleShowcase";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ModuleVisual } from "@/components/ui/ModuleVisual";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore MRI Plan's interactive slice planning, anatomy references, instant feedback, and first learning modules.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container split-layout">
          <div>
            <Breadcrumbs current="Features" />
            <h1>Everything you need to practice MRI planning</h1>
            <p>
              MRI Plan focuses on the decisions that matter most for early MRI learners: positioning, angling, coverage,
              and field of view.
            </p>
          </div>
          <ModuleVisual label="Interactive planning controls" />
        </div>
      </section>
      <FeatureGrid heading={false} />
      <ModuleShowcase />
      <section className="section">
        <div className="container" style={{ maxWidth: "850px" }}>
          <div className="card">
            <span className="eyebrow">Scope</span>
            <h2>What MRI Plan is and is not</h2>
            <p>
              MRI Plan is an educational simulator. It does not connect to any scanner, does not process real patient
              images, and is not a substitute for supervised clinical training or institutional protocols.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
