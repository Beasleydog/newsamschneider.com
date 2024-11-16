"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedIntro } from "./components/AnimatedIntro";
import { WorkExperience } from "./components/WorkExperience";
import { Games } from "./components/Games";
import ArcadeMachineViewer from "./components/arcademachine/ArcadeMachineViewer";
export default function Home() {
  const [loadContent, setLoadContent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="h-screen w-full flex flex-col items-center">
        <ArcadeMachineViewer />
        {/* <AnimatedIntro setLoadContent={setLoadContent} />
        {loadContent && (
          <>
            <motion.p
              className="text-xl text-center max-w-2xl px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              I'm a software engineer passionate about building elegant
              solutions to complex problems. I specialize in full-stack web
              development and love exploring new technologies.
            </motion.p>
            <WorkExperience />
            <Games />
          </>
        )} */}
      </main>
    </div>
  );
}
