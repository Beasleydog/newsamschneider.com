import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function Intro() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [translateUp, setTranslateUp] = useState(false);
  const cycleTime = 5000;

  useEffect(() => {
    const firstInterval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % snippets.length);
      setTranslateUp(false);
    }, cycleTime);

    let secondInterval;
    setTimeout(() => {
      secondInterval = setInterval(() => {
        setTranslateUp(true);
      }, 5000);
    }, 1000);

    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const snippets = [
    ["currently excited by", "agentic AI and its", "impacts."],
    ["enjoys bowling", "and playing ping pong."],
    ["wonders what the", "post AI economy", "will look like."],
    ["likes to", "make pizza", "and eat it."],
  ];
  const maxSnippetRows = Math.max(...snippets.map((snippet) => snippet.length));
  snippets.forEach((snippet) => {
    while (snippet.length < maxSnippetRows) {
      snippet.push("");
    }
  });

  function nextSnippet() {
    return snippets[(currentSnippet + 1) % snippets.length];
  }

  return (
    <div className="overflow-hidden relative flex justify-between min-h-screen w-full p-[3.28vw]">
      {/* Left column - Dictionary content */}
      <div className="flex flex-col">
        <h1 className="text-[6.08vw] font-bold">sam schneider</h1>
        <div className="text-[#2a2a2a] font-semibold flex items-center gap-[1.5vw] text-[3.87vw] -mt-[1.5vw]">
          <span>/sæm ˈʃnaɪdər/</span>
          <span>•</span>
          <span>noun</span>
        </div>
        <p className="mt-[2.5vw] text-[2.87vw] text-[#2a2a2a] font-semibold">
          a software engineer,
          <br />
          studying at UMich,
          <br />
          <div className="flex flex-col gap-[0.8 vw]">
            {snippets[currentSnippet].map((line, index) => (
              <div key={index} className="h-[4vw] overflow-hidden">
                <div
                  className={`${
                    translateUp
                      ? "transition-all duration-1000 translate-y-[-4.3vw]"
                      : ""
                  }`}
                >
                  {line}
                  <br />
                  {nextSnippet()[index]}
                </div>
              </div>
            ))}
          </div>
        </p>
      </div>

      {/* Right column - Navigation */}
      <div className="flex flex-col gap-[1.25vw] mt-[2.08vw] text-[3vw]">
        <button
          onClick={() => scrollToSection("career")}
          className="text-[#575656] hover:text-black transition-colors  font-semibold text-right"
        >
          career
        </button>
        <button
          onClick={() => scrollToSection("games")}
          className="text-[#575656] hover:text-black transition-colors  font-semibold text-right"
        >
          games
        </button>

        <button
          onClick={() => scrollToSection("projects")}
          className="text-[#575656] hover:text-black transition-colors  font-semibold text-right"
        >
          projects
        </button>
        <button
          onClick={() => scrollToSection("fun-facts")}
          className="text-[#575656] hover:text-black transition-colors  font-semibold text-right"
        >
          fun facts
        </button>
      </div>
    </div>
  );
}
