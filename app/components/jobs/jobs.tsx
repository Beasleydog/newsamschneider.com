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
import { useWindowWidth } from "@/app/helpers/useWindowWidth";
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
  const small = useWindowWidth() < 1056;
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
        className={`w-full py-8 flex flex-col gap-[8rem] items-center justify-center ${
          small ? "px-4" : ""
        }`}
        style={{
          background: `radial-gradient(circle, transparent 0%, ${backgroundColor} 100%)`,
        }}
      >
        {/* <div className="flex flex-row items-center justify-center gap-[6rem]">
          {JobBlock(
            jobsData[5].company,
            jobsData[5].role,
            jobsData[5].highlights,
            jobsData[5].period,
            jobsData[5].skills
          )}

          {!small && <Claw />}
        </div> */}
        {small ? (
          <>
            {JobBlock(
              jobsData[1].company,
              jobsData[1].role,
              jobsData[1].highlights,
              jobsData[1].period,
              jobsData[1].skills
            )}
          </>
        ) : (
          <DataPipeLineContainer>
            {JobBlock(
              jobsData[1].company,
              jobsData[1].role,
              jobsData[1].highlights,
              jobsData[1].period,
              jobsData[1].skills
            )}
          </DataPipeLineContainer>
        )}
        <div className="flex flex-row items-center justify-center gap-[6rem]">
          {JobBlock(
            jobsData[4].company,
            jobsData[4].role,
            jobsData[4].highlights,
            jobsData[4].period,
            jobsData[4].skills
          )}
          {!small && <LibraryShapes />}
        </div>
        <div className="flex flex-row items-center justify-center gap-[6rem]">
          {!small && <VMSquare />}
          {JobBlock(
            jobsData[3].company,
            jobsData[3].role,
            jobsData[3].highlights,
            jobsData[3].period,
            jobsData[3].skills
          )}
        </div>
        <div className="flex flex-row items-center justify-center">
          {!small && <GoldenLaw translate={15} scale={1} initialRotation={5} />}
          {JobBlock(
            jobsData[2].company,
            jobsData[2].role,
            jobsData[2].highlights,
            jobsData[2].period,
            jobsData[2].skills
          )}
          {!small && (
            <GoldenLaw translate={-177} scale={-1} initialRotation={5} />
          )}
        </div>
        <div className="flex flex-row items-center justify-center gap-[6rem]">
          {JobBlock(
            jobsData[0].company,
            jobsData[0].role,
            jobsData[0].highlights,
            jobsData[0].period,
            jobsData[0].skills
          )}
          {!small && <RemNoteSquare />}
        </div>
      </div>
    </div>
  );
}
function Claw() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      width="20%"
      viewBox="0 0 253 265"
      enable-background="new 0 0 253 265"
    >
      <path
        fill="#000000"
        opacity="1.000000"
        stroke="none"
        d=" M142.914124,172.842529   C135.325790,203.020218 119.106934,226.512726 92.090569,244.090775   C92.317825,241.499619 92.285042,240.290649 92.544350,239.147949   C99.382317,209.015869 108.563942,179.621140 119.196861,150.598526   C128.741989,124.545013 130.420135,97.294678 127.251762,69.924179   C125.636230,55.968121 122.127327,42.231468 119.487022,28.393206   C119.335831,27.600794 119.247284,26.786531 119.243988,25.981970   C119.243034,25.748270 119.639961,25.512930 120.670349,24.386189   C134.292587,46.770035 142.026321,70.693466 145.931992,95.994568   C149.892044,121.648018 147.331055,147.077438 142.914124,172.842529  z"
      />
      <path
        fill="#000000"
        opacity="1.000000"
        stroke="none"
        d=" M69.475677,201.471832   C61.600178,212.644257 52.709217,222.090088 40.602509,227.787994   C40.133057,227.462723 39.663601,227.137451 39.194145,226.812180   C41.269039,217.322983 43.140106,207.783569 45.462738,198.355408   C49.828735,180.632660 54.329365,162.940750 59.003212,145.296738   C66.132286,118.384125 64.378632,91.510536 58.460812,64.774529   C55.921066,53.300247 52.030468,42.125637 48.782169,30.806686   C48.370190,29.371122 48.132030,27.885677 47.813343,26.423342   C48.242542,26.212563 48.671741,26.001781 49.100945,25.791002   C50.078991,26.958744 51.158913,28.056183 52.020302,29.304428   C78.760010,68.053108 89.642868,111.012596 85.831299,157.775070   C84.533684,173.694946 78.628319,188.037399 69.475677,201.471832  z"
      />
      <path
        fill="#000000"
        opacity="1.000000"
        stroke="none"
        d=" M208.775452,75.270981   C217.680283,108.446404 215.888092,141.129166 205.722122,173.053238   C198.211258,196.639511 182.161560,214.003143 159.979233,225.389023   C158.946320,225.919174 157.874252,226.385559 156.786377,226.790146   C156.344131,226.954620 155.810822,226.874329 154.482391,226.958298   C154.832016,225.079453 154.967926,223.383789 155.468506,221.803680   C163.090942,197.743271 171.614731,174.047165 182.728546,151.315796   C195.462128,125.271538 198.021576,97.472816 195.373688,69.074104   C194.421570,58.862625 191.963623,48.792767 190.241196,38.650074   C190.063660,37.604694 190.217346,36.503059 190.966873,35.208153   C199.697891,47.223400 204.523361,60.894836 208.775452,75.270981  z"
      />
    </svg>
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
  const small = useWindowWidth() < 920;
  return (
    <div
      style={backgroundStyle}
      className={`${
        !small && "w-max"
      } z-10 relative overflow-visible flex flex-col gap-2 border-2 border-[#b7b7b7]  text-neutral-900 p-5 px-9 ${
        ptSerif.className
      }`}
    >
      <h1 className="text-[3rem] font-bold tracking-tighter font-thin">
        {company}
      </h1>
      <div
        className={`flex ${
          small ? "flex-col items-start" : "flex-row items-center"
        }  gap-2`}
      >
        <h2 className="">{title}</h2>
        {!small && <span className="">•</span>}
        <p>{rangeString}</p>
        {!small && (
          <span className="ml-4">
            <GraySkillStack skills={skills} />
          </span>
        )}
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
  return (
    <div className="relative inline-block">
      <motion.img
        src="/jobs/gear.png"
        alt="Rotating Gear"
        className="absolute left-[-3rem] top-[calc(50%-4rem)] z-0 w-[9rem] h-[9rem]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      {children}
      <motion.img
        src="/jobs/gear.png"
        alt="Rotating Gear"
        className="absolute right-[-3rem] top-[calc(50%-4rem)] z-0 w-[9rem] h-[9rem]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
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
