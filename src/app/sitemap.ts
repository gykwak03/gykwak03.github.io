import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { research } from "@/content/research";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/research", "/projects", "/resume", "/contact"];
  const pageUrl = (path: string) => `${absoluteUrl(path)}/`;

  return [
    ...staticPages.map((path) => ({
      url: pageUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...research.map((item) => ({
      url: pageUrl(`/research/${item.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: pageUrl(`/projects/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
