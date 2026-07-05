import { features } from "@/data/content";
import { FeatureCard } from "@/components/sections/FeatureCard";
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
            <FeatureCard
              key={feature.title}
              index={index}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
