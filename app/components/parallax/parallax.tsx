"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax() {
  const { scrollY } = useScroll();

  // Create transform values for each layer
  const layer1Y = useTransform(scrollY, [0, 1000], [50, 0]); // Moves slowest
  const layer2Y = useTransform(scrollY, [0, 1000], [50, 210]);
  const initial3 = 50;
  const final3 = 300;
  const [shadow, setShadow] = useState(0);

  useEffect(() => {
    return layer2Y.on("change", (latest) => {
      const shadowAmount = Math.max(
        0,
        ((latest - final3) / (final3 - initial3)) * 20
      );
      setShadow(shadowAmount);
    });
  }, [layer2Y, final3, initial3]);

  const layer3Y = useTransform(scrollY, [0, 1000], [initial3, final3]);
  const layer4Y = useTransform(scrollY, [0, 1000], [50, -100]);
  console.log((final3 - layer3Y.get()) / (final3 - initial3));
  return (
    <div className="relative h-[200vh] overflow-hidden">
      {/* Background - Fixed */}
      <motion.div
        className="fixed inset-0 w-full h-screen"
        style={{
          backgroundImage: "url('/parallax/sky.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: layer4Y,
        }}
      />

      {/* Layer 3 - Back */}
      <motion.div
        className="fixed inset-0 w-full h-screen"
        style={{
          backgroundImage: "url('/parallax/layer3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: layer3Y,
        }}
      />

      {/* Layer 2 - Middle */}
      <motion.div
        className="fixed inset-0 w-full h-screen"
        style={{
          backgroundImage: "url('/parallax/layer2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: layer2Y,
          filter: `drop-shadow(0 0 ${shadow}px rgba(100, 0, 0, 1))`,
        }}
      />

      {/* Layer 1 - Front */}
      <motion.div
        className="fixed inset-0 w-full h-screen"
        style={{
          backgroundImage: "url('/parallax/layer1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: layer1Y,
        }}
      />
    </div>
  );
}
