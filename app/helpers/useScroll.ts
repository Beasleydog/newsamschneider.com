import { useEffect } from "react";

import { useState } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    setScroll(window.scrollY);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}
