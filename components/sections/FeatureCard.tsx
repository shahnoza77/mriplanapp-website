type FeatureCardProps = {
  index: number;
  title: string;
  text: string;
};

export function FeatureCard({ index, title, text }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
