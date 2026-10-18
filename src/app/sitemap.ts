import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl, isPreview } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  return ["/", "/projects", ...projects.map(project => `/work/${project.slug}`)]
    .map(path => ({ url: absoluteUrl(path) }));
}
