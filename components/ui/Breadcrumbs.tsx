import { site } from "@/data/content";
import Link from "next/link";

export function Breadcrumbs({ current, parent, path }: { current: string; path: string; parent?: { label: string; href: string } }) {
  const items = [
    { name: "Home", path: "/" },
    ...(parent ? [{ name: parent.label, path: parent.href }] : []),
    { name: current, path },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).href,
    })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
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
