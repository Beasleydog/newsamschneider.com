"use client";
import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Handle initial width
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      // Setup resize handler
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}
