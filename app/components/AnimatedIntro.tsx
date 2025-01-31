import { motion } from "framer-motion";
import React, { useState } from "react";

interface AnimatedIntroProps {
  setLoadContent: (value: boolean) => void;
}

export function AnimatedIntro({ setLoadContent }: AnimatedIntroProps) {
  const [showHand, setShowHand] = useState(true);
  const height =
    typeof window !== "undefined" ? window.innerHeight / 2 - 100 : 0;

  return (
    <motion.h1
      className="flex flex-col items-center gap-4 h-[120px] mt-4 mb-4"
      animate={{
        scale: 0.5,
        y: [height, 0],
      }}
      transition={{
        delay: 5,
        duration: 0.8,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        setLoadContent(true);
      }}
    >
      <motion.div
        className="flex justify-center"
        animate={{
          opacity: [1, 1, 0],
          x: 0,
        }}
        transition={{
          opacity: {
            times: [0, 0.8, 1],
            delay: 5,
            duration: 0.8,
          },
        }}
      >
        <motion.div
          className="flex gap-3"
          animate={{
            opacity: 0.1,
            filter: "blur(2px)",
            x: [20, 0],
          }}
          transition={{
            opacity: { delay: 3.5, duration: 1, ease: "easeOut" },
            filter: { delay: 3.5, duration: 1, ease: "easeOut" },
            x: { delay: 2.4, duration: 0.5, ease: "easeOut" },
          }}
        >
          <motion.span className="text-6xl">Hi</motion.span>
          {showHand ? (
            <motion.span
              className="text-6xl w-14"
              animate={{
                rotate: [0, 20, -20, 20, 0],
                transformOrigin: "bottom left",
                opacity: [0, 1, 1, 0],
                x: [0, 2, 0],
                y: [0, 2, 0],
              }}
              transition={{
                rotate: {
                  delay: 0.5,
                  duration: 1,
                  ease: "easeOut",
                },
                opacity: {
                  times: [0, 0.2, 0.8, 1],
                  delay: 0.3,
                  duration: 2,
                },
                x: {
                  delay: 0.2,
                  duration: 2,
                  ease: "easeOut",
                },
                y: {
                  times: [0, 0.2, 0.4],
                  ease: "easeOut",
                },
              }}
              onAnimationComplete={() => {
                setShowHand(false);
              }}
            >
              <img src="/wave.png" alt="hand" className="-scale-x-100" />
            </motion.span>
          ) : (
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-6xl w-14"
            >
              I&apos;m
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: -60 }}
        transition={{
          delay: 3.5,
          duration: 1,
          ease: "easeOut",
        }}
        className="text-8xl font-bold text-center"
      >
        Sam Schneider
      </motion.span>
    </motion.h1>
  );
}
