import { StoreButtons } from "@/components/ui/StoreButtons";
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
              Practice MRI planning on your phone or tablet. MRI Plan is an interactive app that helps you build confidence in slice positioning, angulation, and field of view across axial, sagittal, and coronal views—before scanning real patients.
              <br />
              Download on your iPhone or iPad.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="hero-actions">
              <div className="hero-store-row">
                <StoreButtons />
              </div>
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
