import type { Metadata } from "next";
import { site } from "@/data/content";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: new URL(path, site.url).href,
      title: fullTitle,
      description,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

// Metadata stays separate from module summaries, which are also visible in navigation.
export const moduleSeo: Record<string, { title: string; description: string }> = {
  "brain-planning": {
    title: "Brain MRI Planning Practice",
    description: "Explore brain MRI planning in MRI Plan: axial, sagittal, and coronal views, slice angulation, center position, coverage, and field-of-view decisions.",
  },
  "spine-planning": {
    title: "Chest, Abdomen & Pelvis MRI Planning",
    description: "Explore chest, abdomen, and pelvis MRI planning in MRI Plan, with plane alignment, coverage consistency, slice positioning practice, and adjustment feedback.",
  },
  "msk-planning": {
    title: "MSK MRI Planning Practice",
    description: "Explore MSK MRI planning in MRI Plan, with a knee planning example, touch-friendly slice controls, field-of-view decisions, and feedback for repeated practice.",
  },
};
