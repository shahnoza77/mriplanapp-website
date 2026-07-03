import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = {
  title: "About",
  description: "MRI Plan was created by a practicing MRI technologist to help students practice slice planning outside clinical hours.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs current="About" />
          <Reveal>
            <h1>Built by someone who plans MRI scans every day</h1>
            <p>MRI Plan started with a simple question: why do MRI students get so little low-stakes planning repetition?</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <Reveal className="legal-content">
            <h2>Why MRI Plan exists</h2>
            <p>
              MRI Plan was created by an MRI technologist to give students and early-career MRI professionals an
              interactive way to practice slice planning outside of clinical hours.
            </p>
            <p>
              Planning is spatial and judgment-based. In a real scan room, mistakes cost time and can mean rescanning a
              patient. MRI Plan gives learners a place to repeat those decisions before they are responsible for getting
              them right in clinical practice.
            </p>
            <h2>Where things stand today</h2>
            <p>
              MRI Plan is currently in development, with brain, spine, and MSK planning modules being built first. The
              website exists so students, instructors, and early supporters can follow progress and get notified when the
              app is available.
            </p>
          </Reveal>
          <StaggerGroup className="insight-list">
            <article>
              <h3>Realistic planning mechanics</h3>
              <p>Positioning, angling, coverage, and field of view are treated as practical decisions, not abstract quiz answers.</p>
            </article>
            <article>
              <h3>Immediate feedback</h3>
              <p>The product direction emphasizes specific guidance instead of a simple pass/fail result.</p>
            </article>
            <article>
              <h3>Strict separation from patient data</h3>
              <p>MRI Plan is a training simulator only and does not collect, store, process, or transmit PHI.</p>
            </article>
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
