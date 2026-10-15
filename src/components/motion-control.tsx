"use client";
import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { CloudRain, Pause } from "lucide-react";
import { usePathname } from "next/navigation";

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener("portfolio-motion-change", callback);
  media.addEventListener("change", callback);
  return () => { window.removeEventListener("portfolio-motion-change", callback); media.removeEventListener("change", callback); };
}
function getState() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : document.documentElement.dataset.motion === "paused" ? "paused" : "playing";
}
export function MotionControl() {
  const state = useSyncExternalStore(subscribe, getState, () => "playing");
  const pathname = usePathname();
  useLayoutEffect(() => {
    try { document.documentElement.dataset.motion = localStorage.getItem("portfolio-motion") === "paused" ? "paused" : "playing"; } catch { /* Keep the default motion preference. */ }
    window.dispatchEvent(new Event("portfolio-motion-change"));
  }, []);
  useEffect(() => {
    const scenes = document.querySelectorAll<HTMLElement>("[data-motion-scene]");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.inView = "true"; observer.unobserve(entry.target); }
      }
    }, { threshold: 0.2 });
    scenes.forEach(scene => { scene.dataset.ready = "true"; observer.observe(scene); });
    function visibility() { document.documentElement.dataset.hidden = document.hidden ? "true" : "false"; }
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, [pathname]);
  function toggle() {
    const next = state === "playing" ? "paused" : "playing";
    document.documentElement.dataset.motion = next;
    window.dispatchEvent(new Event("portfolio-motion-change"));
    try { localStorage.setItem("portfolio-motion", next); } catch { /* Motion controls don't require storage. */ }
  }
  return <button className="motion-toggle" type="button" onClick={toggle} disabled={state === "reduced"} aria-label={state === "reduced" ? "Decorative motion disabled by system preference" : state === "playing" ? "Pause decorative motion" : "Resume decorative motion"} aria-pressed={state !== "playing"} title={state === "reduced" ? "Your reduced motion preference is respected" : state === "playing" ? "Pause the weather" : "Let it rain"}>{state === "playing" ? <Pause size={13} /> : <CloudRain size={16} />}</button>;
}
