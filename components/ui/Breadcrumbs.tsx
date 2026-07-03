import Link from "next/link";

export function Breadcrumbs({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs">
        <li>
          <Link href="/">Home</Link>
        </li>
        {parent ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={parent.href}>{parent.label}</Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true">/</li>
        <li>{current}</li>
      </ol>
    </nav>
  );
}
