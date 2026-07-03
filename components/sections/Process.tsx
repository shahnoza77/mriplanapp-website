import { processSteps } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function Process() {
  return (
    <section className="section process-section">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="How it works" title="From first scenario to confident planning" center />
        </Reveal>
        <StaggerGroup className="process-grid">
          {processSteps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
