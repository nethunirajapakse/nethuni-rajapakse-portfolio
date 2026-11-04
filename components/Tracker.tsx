"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (localStorage.getItem("no-track")) return;
    } catch {}
    const params = new URLSearchParams(window.location.search);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        utm: params.get("utm_source"),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
