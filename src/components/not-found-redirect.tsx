"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function NotFoundRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => router.replace("/"), 3000);
    return () => window.clearTimeout(timer);
  }, [router]);

  return <p>Taking you back home in a few seconds.</p>;
}
