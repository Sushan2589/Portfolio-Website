import Link from "next/link";
import { Home, Menu, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MotionControl } from "@/components/motion-control";
const links = [{ name: "Projects", href: "/projects" }, { name: "Experience", href: "/#experience" }, { name: "About", href: "/#about" }, { name: "Contact", href: "/#contact" }];
export function Header() {
  return <header className="site-header page-width"><Link className="home-link" href="/" aria-label="Sushan Dahal home"><Home size={17} /></Link><div className="header-right"><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.name} href={link.href}>{link.name}</Link>)}</nav><span className="header-divider" /><ThemeToggle /><MotionControl /><details className="mobile-menu"><summary aria-label="Open navigation"><Menu size={17} /></summary><nav aria-label="Mobile navigation">{links.map(link => <Link key={link.name} href={link.href}>{link.name}<ArrowUpRight size={13} /></Link>)}</nav></details></div></header>;
}
