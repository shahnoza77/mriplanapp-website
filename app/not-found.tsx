import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">404</span>
          <h1>That page is not part of the plan.</h1>
          <p>The page may have moved during the Next.js migration. Head home or contact MRI Plan if you expected something here.</p>
        </div>
        <Button href="/">Return home</Button>
      </div>
    </section>
  );
}
