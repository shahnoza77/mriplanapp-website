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
          <Reveal>
            <span className="hero-badge">Coming soon to the App Store</span>
          </Reveal>
          <AnimatedHeading as="h1">MRI slice planning before it counts.</AnimatedHeading>
          <Reveal delay={0.18}>
            <p>
            MRI Plan is an interactive simulator for practicing slice positioning, angling, and field-of-view decisions
            across axial, sagittal, and coronal views before scanning real patients.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="hero-actions">
              <Button href="/launch">Get notified at launch</Button>
              <Button href="/features" variant="secondary">
                Explore features
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.34}>
            <ul className="hero-trust">
              <li>Practicing technologist-led</li>
              <li>Classroom-ready direction</li>
              <li>No patient data collected</li>
            </ul>
          </Reveal>
        </div>
        <div className="hero-visual">
          <div className="hero-device-wrap">
            <ModuleVisual label="Brain planning view" />
          </div>
          <Reveal delay={0.45}>
            <aside className="hero-floating-card glass">
              <span>Planning feedback</span>
              <strong>Coverage, angle, and field of view in one practice loop.</strong>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
