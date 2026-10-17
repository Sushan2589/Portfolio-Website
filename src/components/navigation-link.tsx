"use client";

import { useTransition, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import Link, { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";
import { queueSection, scrollToSection } from "@/components/section-navigation";

function NavigationFeedback({ sectionPending }: { sectionPending: boolean }) {
  const { pending } = useLinkStatus();
  if (!pending && !sectionPending) return null;

  // Keep feedback visible when a case study is opened from the story dialog.
  return createPortal(
    <div className="navigation-feedback" role="status" aria-live="polite">
      <span className="navigation-progress" aria-hidden="true" />
      <span className="navigation-label"><span className="loading-spinner" aria-hidden="true" />Loading page…</span>
    </div>,
    document.querySelector("dialog[open]") ?? document.body,
  );
}

export function NavigationLink({ children, onNavigate, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const [sectionPending, startTransition] = useTransition();

  return <Link {...props} onNavigate={event => {
    let cancelled = false;
    onNavigate?.({ preventDefault: () => { cancelled = true; event.preventDefault(); } });
    if (cancelled) return;
    queueSection(null);
    if (typeof props.href !== "string") return;
    const target = new URL(props.href, window.location.href);
    if (target.origin !== window.location.origin || !target.hash) return;

    if (target.pathname === window.location.pathname) {
      if (!scrollToSection(target.hash)) return;
      event.preventDefault();
      // Preserve Next's history state while cleaning an existing fragment.
      if (window.location.hash || target.search !== window.location.search) window.history.replaceState(window.history.state, "", target.pathname + target.search);
      return;
    }

    event.preventDefault();
    queueSection({ pathname: target.pathname, search: target.search, hash: target.hash });
    startTransition(() => {
      const destination = target.pathname + target.search;
      if (props.replace) router.replace(destination, { scroll: false });
      else router.push(destination, { scroll: false });
    });
  }}>{children}<NavigationFeedback sectionPending={sectionPending} /></Link>;
}
