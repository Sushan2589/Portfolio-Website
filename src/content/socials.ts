import { isEmail, site } from "@/content/site";

export type SocialIcon = "github" | "linkedin" | "x" | "instagram" | "youtube" | "website" | "email" | "resume";
export type SocialLink = { label: string; icon: SocialIcon; url: string };

// Add/reorder entries here. #linkhere entries stay hidden until a URL is supplied.
// Personal links below follow site.ts so they only need to be edited once.
export const socialLinks: SocialLink[] = [
  { label: "GitHub", icon: "github", url: site.github },
  { label: "LinkedIn", icon: "linkedin", url: site.linkedin },
  { label: "Email", icon: "email", url: isEmail(site.email) ? `mailto:${site.email}` : "#linkhere" },
  { label: "Résumé", icon: "resume", url: site.resume },
  { label: "X", icon: "x", url: "#linkhere" },
  { label: "Instagram", icon: "instagram", url: "#linkhere" },
  { label: "YouTube", icon: "youtube", url: "#linkhere" },
  { label: "Website", icon: "website", url: "#linkhere" },
];
