import Link from "next/link";
import { modules } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export function ModuleShowcase() {
  return (
    <section className="section band module-showcase">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Practice modules" title="Brain, spine, and MSK planning are first in development">
            Each module focuses on the planning decisions MRI learners need to repeat: position, angle, coverage, and field of view.
          </SectionHeading>
        </Reveal>
        <StaggerGroup className="module-list">
          {modules.map((module) => (
            <Link className="module-row" href={`/modules/${module.slug}`} key={module.slug}>
              <span>{module.eyebrow}</span>
              <strong>{module.title}</strong>
              <p>{module.summary}</p>
              <em>{module.status}</em>
            </Link>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
