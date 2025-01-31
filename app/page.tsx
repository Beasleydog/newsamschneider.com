"use client";

import React, { useState } from "react";
import { Games } from "./components/games/Games";
import Bento from "./components/factsbento/bento";
import MountainIntro from "./components/mountainintro/mountainintro";
import Jobs from "./components/jobs/jobs";
import Waves from "./components/waves/waves";
import Projects from "./components/projects/projects";
import Nav from "./components/nav/nav";
import Loading from "./components/loading/Loading";
import { useWindowWidth } from "./helpers/useWindowWidth";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const small = useWindowWidth() < 870;

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <AnimatePresence>
        {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Nav />
        <main className="w-full flex flex-col items-center overflow-x-clip">
          <MountainIntro />
          <Jobs />
          <Games />
          <Projects />
          {!small && (
            <div id="fun-facts">
              <Bento />
            </div>
          )}
          <Waves />
        </main>
      </motion.div>
    </div>
  );
}
