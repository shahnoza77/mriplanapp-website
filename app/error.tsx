"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Error</span>
          <h1>Something interrupted this view.</h1>
          <p>Please try again. If it keeps happening, contact MRI Plan and include what page you were opening.</p>
        </div>
        <Button type="button" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  );
}
