import { trustMetrics } from "@/data/content";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Reveal } from "@/components/motion/Reveal";

export function TrustStrip() {
  return (
    <section className="section tight trust-section">
      <div className="container">
        <Reveal>
          <dl className="trust-strip glass">
          {trustMetrics.map((metric) => (
            <div key={metric.label}>
              <dt>
                <AnimatedNumber value={metric.value} />
              </dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
