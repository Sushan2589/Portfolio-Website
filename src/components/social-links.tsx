import { FileText, Github, Globe, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { isPublicLink, isEmail } from "@/content/site";
import { socialLinks, type SocialIcon } from "@/content/socials";

const icons: Record<SocialIcon, ReactNode> = {
  github: <Github size={15} />,
  linkedin: <Linkedin size={15} />,
  instagram: <Instagram size={15} />,
  youtube: <Youtube size={15} />,
  website: <Globe size={15} />,
  email: <Mail size={15} />,
  resume: <FileText size={15} />,
  x: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l7.9-9.1L.8 2h6.5l4.4 6.7L18.9 2ZM17.8 20h1.7L6.2 3.9H4.4L17.8 20Z" /></svg>,
};

export function SocialLinks() {
  const links = socialLinks.filter(link => (link.url.startsWith("mailto:") && isEmail(link.url.slice(7))) || isPublicLink(link.url));
  if (!links.length) return null;
  return <div className="social-links" aria-label="Contact and social profiles">{links.map(link => <a key={`${link.label}-${link.url}`} href={link.url} aria-label={link.label} title={link.label} {...(link.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{icons[link.icon]}</a>)}</div>;
}
