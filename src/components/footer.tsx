import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { isPublicLink, site } from "@/content/site";
export function Footer() {
  return (
    <footer className="site-footer page-width">
      <div className="footer-main">
        <div className="footer-bio">
          <Link href="/">Sushan Dahal</Link>
          <p>
            Software developer & product builder.
            <br />
            Making useful things from Kathmandu.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <span className="footer-label">EXPLORE</span>
          <Link href="/projects">Projects</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="footer-meta">
          <span className="footer-label">ELSEWHERE</span>
          {isPublicLink(site.github) && (
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub 
            </a>
          )}
          {isPublicLink(site.linkedin) && (
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn 
            </a>
          )}
          {isPublicLink(site.resume) && (
            <a href={site.resume} target="_blank" rel="noopener noreferrer">
              Résumé 
            </a>
          )}
          <Link href="#top">
            Back to top <ArrowUp size={11} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sushan Dahal</span>
        <span>Built with care. Kept simple.</span>
      </div>
    </footer>
  );
}
