import Image from "next/image";
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
              <a
                className="hero-app-store"
                href="https://apps.apple.com/app/id6787633208"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download MRI Plan on the App Store"
              >
                <Image
                  src="/images/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={144}
                  height={48}
                />
              </a>
              <button className="hero-google-play" type="button" disabled aria-disabled="true">
                <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
                  <path d="M2 1.5v23L22 13 2 1.5Z" />
                </svg>
                <span>Google Play — Coming Soon</span>
              </button>
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
