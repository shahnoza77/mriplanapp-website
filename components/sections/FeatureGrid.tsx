import { features } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function FeatureGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section">
      <div className="container">
        {heading ? (
          <Reveal>
            <SectionHeading eyebrow="Core features" title="Everything you need to practice planning" center>
              A focused set of tools for learning proper slice positioning without bloated simulator complexity.
            </SectionHeading>
          </Reveal>
        ) : null}
        <StaggerGroup className="feature-grid">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
