type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, children, center = false, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={`section-heading${center ? " center" : ""}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag>{title}</Tag>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
