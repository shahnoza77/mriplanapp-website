import type { MetadataRoute } from "next";
import { modules, site } from "@/data/content";

const routes = ["", "/features", "/about", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      changeFrequency: (route === "" ? "monthly" : "yearly") as "monthly" | "yearly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...modules.map((module) => ({
      url: `${site.url}/modules/${module.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
