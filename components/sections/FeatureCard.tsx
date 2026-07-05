"use client";

import { useState } from "react";

type FeatureCardProps = {
  index: number;
  title: string;
  text: string;
};

export function FeatureCard({ index, title, text }: FeatureCardProps) {
  const [active, setActive] = useState(false);

  return (
    <article
      className={`feature-card${active ? " is-active" : ""}`}
      onClick={() => setActive((prev) => !prev)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActive((prev) => !prev);
        }
      }}
      tabIndex={0}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
