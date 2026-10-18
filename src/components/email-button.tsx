import { Mail } from "lucide-react";
import { site } from "@/content/site";

export function EmailButton() {
  return <a className="email-box" href={`mailto:${site.email}`} aria-label="Email me">
    <span className="email-icon-frame"><Mail size={15} className="email-icon decorative-motion" /></span>
    <span>Email me</span><span className="status-dot decorative-motion" aria-hidden="true" />
  </a>;
}
