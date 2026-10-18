import type { Metadata } from "next";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Atmosphere } from "@/components/atmosphere";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import { SectionNavigation } from "@/components/section-navigation";
import { StructuredData } from "@/components/structured-data";
import { websiteSchema } from "@/lib/structured-data";
import { defaultTitle, isPreview, pageMetadata, siteOrigin } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: defaultTitle, description: site.description, path: "/" }),
  title: { default: defaultTitle, template: "%s · Sushan Dahal" },
  metadataBase: new URL(siteOrigin),
  applicationName: "Sushan Dahal — Portfolio",
  authors: [{ name: site.name, url: siteOrigin }],
  creator: site.name,
  robots: {
    index: !isPreview, follow: true,
    googleBot: { index: !isPreview, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning><head><link rel="describedby" href="/llms.txt" type="text/plain" /></head><body id="top"><StructuredData data={websiteSchema()} /><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark';document.documentElement.dataset.motion=localStorage.getItem('portfolio-motion')==='paused'?'paused':'playing'}catch(e){}` }} /><noscript dangerouslySetInnerHTML={{ __html: "<style>.decorative-motion{animation:none!important}.signature-ink,.signature-underline{stroke-dashoffset:0!important}</style>" }} /><Atmosphere /><a href="#main" className="skip-link">Skip to content</a><Header /><SectionNavigation />{children}<Footer /></body></html>;
}
