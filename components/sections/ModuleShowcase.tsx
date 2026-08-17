import Link from "next/link";
import { modules } from "@/data/content";
import { PhoneVisual } from "@/components/ui/PhoneVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

const moduleImages: Record<string, { src: string; alt: string; order: number }> = {
  "brain-planning": { src: "/images/neuro-mri-phone.png", alt: "MRI Plan Neuro MRI axial planning result on iPhone", order: 1 },
  "msk-planning": { src: "/images/msk-planning-phone.png", alt: "MRI Plan MSK knee sagittal planning result on iPhone", order: 2 },
  "spine-planning": { src: "/images/abdomen-mri-phone.png", alt: "MRI Plan abdomen coronal planning result on iPhone", order: 3 },
};

export function ModuleShowcase() {
  const showcaseModules = modules
    .filter((module) => moduleImages[module.slug])
    .sort((a, b) => moduleImages[a.slug].order - moduleImages[b.slug].order);

  return (
    <section className="section band module-showcase">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Practice modules" title="Plan across neuro, MSK, and body MRI">
            Build confidence with focused practice in position, angle, coverage, and field of view.
          </SectionHeading>
        </Reveal>
        <StaggerGroup className="module-list">
          {showcaseModules.map((module) => {
            const image = moduleImages[module.slug];
            return (
              <Link className="module-card" href={`/modules/${module.slug}`} key={module.slug}>
                <PhoneVisual src={image.src} alt={image.alt} />
                <div className="module-card__content">
                  <span className="eyebrow">{module.eyebrow}</span>
                  <h3>{module.title}</h3>
                  <ul className="module-card__focus">
                    {module.focus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </Link>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
