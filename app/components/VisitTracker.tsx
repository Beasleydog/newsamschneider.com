"use client";

import { useEffect, useRef } from "react";

function generateVisitId(): string {
  // Try crypto.randomUUID, fallback to timestamp + random
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function VisitTracker() {
  const startedAtRef = useRef<number | null>(null);
  const visitIdRef = useRef<string | null>(null);

  useEffect(() => {
    const visitId = generateVisitId();
    visitIdRef.current = visitId;
    const startedAt = Date.now();
    startedAtRef.current = startedAt;

    const referer = document.referrer || null;
    const userAgent = navigator.userAgent || null;

    // Fire start event
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "start",
        visitId,
        referer,
        userAgent,
        ts: startedAt,
      }),
      cache: "no-store",
      keepalive: true,
    }).catch(() => {});

    // End event via sendBeacon on pagehide
    const handlePageHide = () => {
      const endedAt = Date.now();
      const durationMs = Math.max(
        0,
        endedAt - (startedAtRef.current ?? endedAt)
      );
      const payload = JSON.stringify({
        type: "end",
        visitId: visitIdRef.current,
        durationMs,
        ts: endedAt,
      });
      const blob = new Blob([payload], { type: "application/json" });
      if (!navigator.sendBeacon("/api/visit", blob)) {
        // Fallback
        fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          cache: "no-store",
          keepalive: true,
        }).catch(() => {});
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
    };
  }, []);

  return null;
}
