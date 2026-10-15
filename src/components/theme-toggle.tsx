"use client";
import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
  window.addEventListener("portfolio-theme-change", callback);
  return () => window.removeEventListener("portfolio-theme-change", callback);
}
function getTheme() { return document.documentElement.dataset.theme === "dark"; }
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getTheme, () => true);
  useLayoutEffect(() => {
    try { document.documentElement.dataset.theme = localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark"; } catch { /* Keep the default theme. */ }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }, []);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.dispatchEvent(new Event("portfolio-theme-change"));
    try { localStorage.setItem("portfolio-theme", next ? "dark" : "light"); } catch { /* Storage is optional. */ }
  }
  return <button className="theme-toggle" type="button" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={dark} onClick={toggle}>{dark ? <Moon size={16} /> : <Sun size={16} />}</button>;
}
