import type { Metadata } from "next";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Atmosphere } from "@/components/atmosphere";
import { Footer } from "@/components/footer";
import { site, isPublicLink } from "@/content/site";

export const metadata: Metadata = {
  title: { default: "Sushan Dahal — Developer & product builder", template: "%s · Sushan Dahal" },
  description: site.description,
  metadataBase: new URL(isPublicLink(site.url) && /^https?:\/\//.test(site.url) ? site.url : "http://localhost:3000"),
  openGraph: { type: "website", locale: "en_US", title: "Sushan Dahal — Developer & product builder", description: site.description, siteName: "Sushan Dahal" },
  twitter: { card: "summary_large_image", title: "Sushan Dahal — Developer & product builder", description: site.description },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning><body id="top"><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark';document.documentElement.dataset.motion=localStorage.getItem('portfolio-motion')==='paused'?'paused':'playing'}catch(e){}` }} /><noscript dangerouslySetInnerHTML={{ __html: "<style>.decorative-motion{animation:none!important}.signature-ink,.signature-underline{stroke-dashoffset:0!important}</style>" }} /><Atmosphere /><a href="#main" className="skip-link">Skip to content</a><Header />{children}<Footer /></body></html>;
}
