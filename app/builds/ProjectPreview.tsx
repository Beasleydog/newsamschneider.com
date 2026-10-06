"use client";

import { PointerEvent, ReactNode, useEffect, useRef } from "react";

export default function ProjectPreview({ children, tone }: { children: ReactNode; tone: "library" | "tab" }) {
  const preview = useRef<HTMLDivElement>(null);
  const frame = useRef<number>();
  const motionAllowed = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)");
    const update = () => {
      motionAllowed.current = preference.matches;
      if (!preference.matches) reset();
    };
    update();
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, []);

  function reset() {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    preview.current?.style.setProperty("--tilt-x", "0deg");
    preview.current?.style.setProperty("--tilt-y", "0deg");
  }

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (!motionAllowed.current || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      preview.current?.style.setProperty("--tilt-x", `${-y * 10}deg`);
      preview.current?.style.setProperty("--tilt-y", `${x * 12}deg`);
    });
  }

  return (
    <div className={`builds-project-image builds-project-${tone}`} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="builds-preview-object" ref={preview}>
        {children}
      </div>
    </div>
  );
}
