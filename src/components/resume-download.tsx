import { Download } from "lucide-react";
import { isPublicLink, site } from "@/content/site";

export function ResumeDownload({ compact = false }: { compact?: boolean }) {
  if (!isPublicLink(site.resume)) return null;

  return (
    <a
      className={compact ? "resume-download-text" : "resume-download"}
      href={site.resume}
      download="Sushan-Dahal-Resume.pdf"
    >
      <Download size={compact ? 12 : 15} aria-hidden="true" />
      <span>Download Resume</span>
      {!compact && <span className="resume-format">PDF</span>}
    </a>
  );
}
