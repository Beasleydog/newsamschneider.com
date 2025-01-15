import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { games } from "../constants/games";
import ArcadeMachineViewer from "./arcademachine/ArcadeMachineViewer";
import { jersey15 } from "../fonts";
import Image from "next/image";
export function Games() {
  const [glitchAmount, setGlitchAmount] = useState(1);
  const awardText = "AWARD";
  const winningText = "WINNING";
  const gamesText = "GAMES";
  const descriptionText =
    "I've created multiple nationally recognized games, including winners of the Congressional App Challenge and Games For Change Accessibility Challenge. My games have been displayed in the U.S. Capitol and used in classrooms across Philadelphia.";

  useEffect(() => {
    // Gradually reduce glitch amount over 2 seconds
    const startTime = Date.now();
    const duration = 2000;

    const glitchInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setGlitchAmount(1 - progress);

      if (progress >= 1) {
        clearInterval(glitchInterval);
      }
    }, 16);

    return () => clearInterval(glitchInterval);
  }, []);

  const applyGlitch = (text: string) => {
    if (glitchAmount === 0) return text;

    return text
      .split("")
      .map((char) => {
        if (Math.random() < glitchAmount * 0.2) {
          // Shift characters randomly within common ASCII range
          return String.fromCharCode(
            Math.floor(Math.random() * (127 - 33) + 33)
          );
        }
        if (Math.random() < glitchAmount * 0.1) {
          return char + char; // Duplicate characters
        }
        return char;
      })
      .join("");
  };

  return (
    <motion.div
      className="w-[calc(100%-100px)] h-[calc(100%-200px)] px-8 mt-24 flex flex-row items-center m-16 bg-black rounded-3xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`w-1/2 p-12`}>
        <div className="mb-8">
          <span
            className={`font-bold mb-4 ${jersey15.className} z-10 flex flex-row items-center gap-4`}
            style={{
              lineHeight: "0",
              fontSize: "5rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-red-600">{applyGlitch(awardText)}</span>{" "}
            <span className="text-yellow-600">{applyGlitch(winningText)}</span>
            <FloatingSparkle size={20} offsetX={-30} offsetY={-20} />
            <FloatingSparkle size={20} offsetX={-290} offsetY={15} />
          </span>
          <pre
            className={`whitespace-pre-wrap font-bold mb-4 ${jersey15.className}`}
            style={{
              fontSize: "12rem",
              lineHeight: "1",
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {applyGlitch(gamesText)}
          </pre>
          <pre
            className="whitespace-pre-wrap"
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.5",
              color: "#ffff00",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {applyGlitch(descriptionText)}
          </pre>
        </div>
      </div>
      <ArcadeMachineViewer />
    </motion.div>
  );
}
function FloatingSparkle({
  size,
  offsetX,
  offsetY,
}: {
  size: number;
  offsetX: number;
  offsetY: number;
}) {
  return (
    <Image
      src="/sparkle.png"
      alt="award"
      width={size}
      height={size}
      style={{
        imageRendering: "pixelated",
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        width: size,
        height: size,
      }}
    />
  );
}
