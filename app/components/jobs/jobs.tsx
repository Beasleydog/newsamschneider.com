"use client";

import React, { SVGProps } from "react";
import { ptSerif, rammettoOne } from "../../fonts";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "./jobs.css";
import { experiences } from "../../constants/experiences";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BRAND_COLORS } from "../../constants/colors";
import { script } from "../../constants/script";
export const blockClass = "h-[50vh]";
const backgroundColor = "#faf8f8";
interface Skill {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  name: keyof typeof BRAND_COLORS;
}

function GraySkillStack({ skills }: { skills: Skill[] }) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <div className="flex gap-1">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Tooltip.Root key={skill.name}>
              <Tooltip.Trigger>
                <button
                  className="rounded-full p-1.5 hover:bg-[#b7b7b730] transition-colors"
                  style={{
                    backgroundColor: `#b7b7b715`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#b7b7b7" }} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="z-20 rounded-md px-3 py-1.5 text-sm bg-gray-800/95 text-gray-100 
                    shadow-lg border border-gray-700 select-none
                    animate-in fade-in-0 zoom-in-95 
                    data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
                    data-[state=closed]:zoom-out-95 backdrop-blur-sm"
                  sideOffset={5}
                >
                  {skill.name}
                  <Tooltip.Arrow className="fill-gray-800/95" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          );
        })}
      </div>
    </Tooltip.Provider>
  );
}
export default function Jobs() {
  const jobsData = experiences;
  return (
    <div
      id="career"
      className="w-full"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e5e5 1px, transparent 1px),
          linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div
        className="w-full py-8 flex flex-col gap-[8rem] items-center justify-center"
        style={{
          background: `radial-gradient(circle, transparent 0%, ${backgroundColor} 100%)`,
        }}
      >
        <DataPipeLineContainer>
          {JobBlock(
            jobsData[1].company,
            jobsData[1].role,
            jobsData[1].highlights,
            jobsData[1].period,
            jobsData[1].skills
          )}
        </DataPipeLineContainer>
        <div className="flex flex-row items-center justify-center gap-[6rem]">
          {JobBlock(
            jobsData[4].company,
            jobsData[4].role,
            jobsData[4].highlights,
            jobsData[4].period,
            jobsData[4].skills
          )}
          <LibraryShapes />
        </div>
        <div className="flex flex-row items-center justify-center gap-[6rem]">
          <VMSquare />
          {JobBlock(
            jobsData[3].company,
            jobsData[3].role,
            jobsData[3].highlights,
            jobsData[3].period,
            jobsData[3].skills
          )}
        </div>
        <div className="flex flex-row items-center justify-center">
          <GoldenLaw translate={15} scale={1} initialRotation={5} />
          {JobBlock(
            jobsData[2].company,
            jobsData[2].role,
            jobsData[2].highlights,
            jobsData[2].period,
            jobsData[2].skills
          )}
          <GoldenLaw translate={-177} scale={-1} initialRotation={5} />
        </div>
        <div className="flex flex-row items-center justify-center gap-[6rem]">
          {JobBlock(
            jobsData[0].company,
            jobsData[0].role,
            jobsData[0].highlights,
            jobsData[0].period,
            jobsData[0].skills
          )}
          <RemNoteSquare />
        </div>
      </div>
    </div>
  );
}

function GoldenLaw({
  translate,
  scale,
  initialRotation,
}: {
  translate: number;
  scale: number;
  initialRotation: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="h-[17rem] w-[10rem]"
      style={{
        backgroundImage: "url('/jobs/law.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transformOrigin: `100% 100%`,
      }}
      initial={{ scale: 0, x: translate, scaleX: scale }}
      animate={
        isInView
          ? {
              scale: 1,
              x: translate,
              scaleX: scale,
              rotate: [0, initialRotation - 1, initialRotation + 1],
            }
          : {
              scale: 0,
              x: translate * 2,
              scaleX: scale,
              rotate: 90,
            }
      }
      transition={
        isInView
          ? {
              rotate: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                repeatType: "reverse",
              },
              scale: { duration: 0.5 },
              x: { duration: 0.5 },
            }
          : { duration: 0.5 }
      }
    />
  );
}

function JobBlock(
  company: string,
  title: string,
  description: string[],
  rangeString: string,
  skills: Skill[]
) {
  const handleClass =
    "absolute w-[10px] h-[10px] bg-[#faf8f8] border-2 border-[#b7b7b7]";
  const backgroundStyle = { background: backgroundColor };
  return (
    <div
      style={backgroundStyle}
      className={`w-max z-10 relative overflow-visible flex flex-col gap-2 border-2 border-[#b7b7b7]  text-neutral-900 p-5 px-9 ${ptSerif.className}`}
    >
      <h1 className="text-[3rem] font-bold tracking-tighter font-thin">
        {company}
      </h1>
      <div className="flex flex-row items-center gap-2">
        <h2 className="">{title}</h2>
        <span className="">•</span>
        <p>{rangeString}</p>
        <span className="ml-4">
          <GraySkillStack skills={skills} />
        </span>
      </div>
      <ul className="max-w-2xl mt-2 list-disc list-inside pl-2">
        {description.map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
      <div
        style={backgroundStyle}
        className={`${handleClass} -top-1.5 -left-1.5`}
      ></div>
      <div
        style={backgroundStyle}
        className={`${handleClass} -top-1.5 -right-1.5`}
      ></div>
      <div
        style={backgroundStyle}
        className={`${handleClass} -bottom-1.5 -left-1.5`}
      ></div>
      <div
        style={backgroundStyle}
        className={`${handleClass} -bottom-1.5 -right-1.5`}
      ></div>
    </div>
  );
}
function LibraryShapes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative w-[10rem] h-[10rem]" ref={ref}>
      <motion.div
        initial={{ scale: 0 }}
        animate={
          isInView
            ? {
                scale: 1,
                y: [-5, 5, -5],
                rotate: [0, 5, -5, 0],
              }
            : { scale: 0 }
        }
        transition={{
          scale: { duration: 0.3, ease: "backOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute w-[5rem] h-[5rem] rounded-[12px]"
        style={{ backgroundColor: "#1a827b" }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={
          isInView
            ? {
                scale: 1,
                y: [0, -10, 0],
                rotate: [0, 360],
              }
            : { scale: 0 }
        }
        transition={{
          scale: { duration: 0.3, ease: "backOut", delay: 0.1 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-8 left-8 w-[6rem] h-[6rem] rounded-full"
        style={{ backgroundColor: "#fea50c" }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={
          isInView
            ? {
                scale: 1,
                y: [0, 15, 0],
                rotate: [0, -15, 15, 0],
              }
            : { scale: 0 }
        }
        transition={{
          scale: { duration: 0.3, ease: "backOut", delay: 0.2 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-4 right-4 w-[4rem] h-[4rem] rounded-[8px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="107"
          height="114"
          viewBox="0 0 107 114"
          fill="none"
        >
          <path
            d="M83.0362 2.36069C87.3308 -0.894088 93.5383 1.7207 94.2098 7.06731L106.619 105.884C107.29 111.231 101.922 115.299 96.9562 113.207L5.17374 74.5457C0.207731 72.4539 -0.631555 65.7706 3.66303 62.5159L83.0362 2.36069Z"
            fill="#D7222D"
          />
        </svg>
      </motion.div>
    </div>
  );
}

function VMSquare() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  useEffect(() => {
    if (isInView) {
      setShowCursor(true);
      // Type V after a delay
      setTimeout(() => setText("V"), 500);

      // Type M after V
      setTimeout(() => setText("VM"), 1000);

      // Hide cursor after typing
      setTimeout(() => setShowCursor(false), 2000);
    }
  }, [isInView]);

  return (
    <div
      className={`text-[10rem] text-[#171717] p-8 rounded-[1rem] transform rotate-[-2deg] h-[17rem] relative overflow-hidden ${rammettoOne.className}`}
      style={{
        letterSpacing: "-1rem",
      }}
      ref={ref}
    >
      {text}
      <span
        className={`inline-block w-[0.05em] h-[8rem] bg-[#171717] ml-3 ${
          showCursor ? "blink" : "opacity-0"
        }`}
      />
      <motion.div
        className="absolute inset-0 skew-x-[25deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.15) 55%, transparent)",
          transform: "translateX(-200%)",
        }}
        animate={
          isInView && text === "VM"
            ? {
                x: ["-100%", "300%"],
                transition: {
                  delay: 2,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "linear",
                },
              }
            : {}
        }
      />
    </div>
  );
}

function DataPipeLineContainer({ children }: { children: React.ReactNode }) {
  const sectionLength = 100;
  const [start, setStart] = useState(script.length);
  useEffect(() => {
    const interval = setInterval(() => {
      setStart((start) => (start - 2 < 0 ? script.length : start - 2));
    }, 10);
    return () => clearInterval(interval);
  }, []);
  const showText = script.slice(start, start + sectionLength);
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className="text-xl flex-1 h-full overflow-hidden whitespace-nowrap blur-[1px] italic">
        <div
          className=""
          style={{
            background:
              "linear-gradient(90deg, transparent 50%, rgba(23,23,23,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            height: "27px",
          }}
        >
          {showText}
        </div>
      </div>
      <div className="w-0 overflow-visible">
        <div
          style={{
            backgroundImage: "url('/jobs/inout.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "90px",
            width: "44px",
            transform: "translate(-100%, -50%)",
            position: "absolute",
          }}
        />
      </div>
      <div className="w-max">{children}</div>
      <div className="w-0 overflow-visible">
        <div
          style={{
            backgroundImage: "url('/jobs/inout.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "90px",
            width: "44px",
            transform: "translateY(-50%) scaleX(-1)",
            position: "absolute",
            zIndex: 20,
          }}
        />
      </div>
      <div className="flex-1  h-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="text-[4.5rem]"
          initial={{ x: "0%", opacity: 0 }}
          whileInView={{
            x: ["-10%", "30%"],
            opacity: [1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
              delay: 2,
            },
          }}
        >
          📦
        </motion.div>
      </div>
    </div>
  );
}

function RemNoteSquare() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{
        width: "0rem",
        height: "0rem",
        borderRadius: "6rem",
        rotate: 0,
      }}
      animate={
        isInView
          ? {
              width: "12rem",
              height: "12rem",
              borderRadius: "6rem",
              rotate: 0,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              },
            }
          : {}
      }
      className="bg-[#4f6cf5] relative"
    >
      <motion.div
        initial={{ borderRadius: "6rem", rotate: 0 }}
        animate={
          isInView
            ? {
                borderRadius: ["1rem", "2rem", "1rem"],
                rotate: 2,
                transition: {
                  rotate: {
                    delay: 0.4,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                  borderRadius: {
                    delay: 0.8,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                },
              }
            : {}
        }
        className="absolute inset-0 bg-[#4f6cf5]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  transition: {
                    delay: 0.8,
                    duration: 0.4,
                  },
                }
              : {}
          }
          className="absolute inset-0 p-8"
          style={{
            backgroundImage: "url('/jobs/remnote.svg')",
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
