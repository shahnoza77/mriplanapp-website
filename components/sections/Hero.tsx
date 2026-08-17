import { Button } from "@/components/ui/Button";
import { ModuleVisual } from "@/components/ui/ModuleVisual";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="container wide hero-grid">
        <div className="hero-copy">
          <AnimatedHeading as="h1">MRI slice planning  Interactive Simulator.</AnimatedHeading>
          <Reveal delay={0.18}>
            <p>
            MRI Plan is an interactive simulator for practicing slice positioning, angling, and field-of-view decisions
            across axial, sagittal, and coronal views before scanning real patients.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="hero-actions">
              <Button href="/features">
                Explore Features
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.34}>
            <ul className="hero-trust">
              <li>Classroom-ready direction</li>
              <li>No patient data collected</li>
            </ul>
          </Reveal>
        </div>
        <div className="hero-visual">
          <div className="hero-device-wrap">
            <ModuleVisual label="Brain planning view" showImage={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
