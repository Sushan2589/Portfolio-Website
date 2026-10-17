"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type SectionTarget = { pathname: string; search: string; hash: string };
let pendingSection: SectionTarget | null = null;

export function queueSection(target: SectionTarget | null) {
  pendingSection = target;
}

export function scrollToSection(hash: string) {
  let id: string;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return false; }
  const target = document.getElementById(id);
  if (!target) return false;

  // Move keyboard focus along with the viewport, as a native section link does.
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  }
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: "start" });
  return true;
}

export function SectionNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    const target = pendingSection;
    if (!target || target.pathname !== pathname || target.search !== window.location.search) return;
    pendingSection = null;
    // Run after the destination has committed and Next has handled its layout.
    const frame = requestAnimationFrame(() => scrollToSection(target.hash));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
