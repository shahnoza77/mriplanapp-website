import type { MetadataRoute } from "next";
import { modules } from "@/data/content";

const routes = ["", "/features", "/about", "/faq", "/contact", "/launch", "/privacy-policy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((route) => ({
      url: `https://mriplanapp.com${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "monthly" : "yearly") as "monthly" | "yearly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...modules.map((module) => ({
      url: `https://mriplanapp.com/modules/${module.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
