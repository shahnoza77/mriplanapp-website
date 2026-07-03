import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta({
  title = "Be first to know when MRI Plan launches",
  text = "Leave your email and we will notify you when MRI Plan is available on the App Store.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section final-cta">
      <div className="container">
        <Reveal>
          <div className="final-cta__inner">
            <span className="eyebrow">Stay in the loop</span>
            <h2>{title}</h2>
            <p>{text}</p>
            <div>
              <Button href="/launch">Get notified</Button>
              <Button href="/about" variant="secondary">
                Learn about the project
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
