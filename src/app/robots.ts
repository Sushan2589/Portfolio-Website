import type { MetadataRoute } from "next";
import { absoluteUrl, isPreview } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return isPreview
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml") };
}
