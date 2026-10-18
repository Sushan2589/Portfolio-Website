import type { Metadata } from "next";
import { site } from "@/content/site";

// A single origin keeps metadata, sitemap, structured data, and Markdown in sync.
export const siteOrigin = new URL(process.env.SITE_URL || site.url).origin;
export const isPreview = process.env.VERCEL_ENV === "preview";
export const defaultTitle = "Sushan Dahal — Software Developer & Product Builder";

export function absoluteUrl(path: string) {
  return new URL(path, `${siteOrigin}/`).toString();
}

export function pageMetadata({ title, description, path, image = "/opengraph-image" }: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const socialTitle = title === defaultTitle ? title : `${title} · ${site.name}`;
  const markdownPath = path === "/" ? "/index.md" : `${path}/index.md`;
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      types: { "text/markdown": absoluteUrl(markdownPath) },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl(path),
      siteName: `${site.name} — Portfolio`,
      title: socialTitle,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: absoluteUrl(image), alt: socialTitle }],
    },
  };
}
