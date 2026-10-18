"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { isEmail, site } from "@/content/site";
export function ContactPanel() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(site.email); setState("copied"); } catch { setState("failed"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 3000);
  }
  return <section className="contact-panel" id="contact" aria-labelledby="contact-title">
    <span className="section-eyebrow">GET IN TOUCH</span>
    <h2 id="contact-title" className="marked-heading">Have a useful problem to solve?</h2>
    <p>I’d love to hear what you’re working on.</p>
    <div className="contact-buttons">
      <a className="contact-pill" href={`mailto:${site.email}`}><Avatar small /> Start a conversation<span className="status-dot decorative-motion" aria-hidden="true" /></a>
      {isEmail(site.email) && <button type="button" className="copy-email" aria-label="Copy email address" onClick={copy}>{state === "copied" ? <Check size={14} /> : <Copy size={14} />}</button>}
    </div>
    <span className="copy-feedback" role="status">{state === "copied" ? "Email copied." : state === "failed" ? "Couldn’t copy. Use the email link instead." : ""}</span>
    <span className="contact-place">Kathmandu, Nepal · open to a good conversation</span>
  </section>;
}
