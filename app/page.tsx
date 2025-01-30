"use client";

import React, { useState } from "react";
import { Games } from "./components/games/Games";
import Bento from "./components/factsbento/bento";
import Intro from "./components/intro/intro";
import Jobs from "./components/jobs/jobs";
import Waves from "./components/waves/waves";
import Projects from "./components/projects/projects";

export default function Home() {
  const [loadContent, setLoadContent] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <main className="w-full flex flex-col items-center overflow-x-clip">
        {loadContent && (
          <>
            <Intro />
            <Jobs />
            <Games />
            <Projects />
            <div id="fun-facts">
              <Bento />
            </div>
            <Waves />
          </>
        )}
      </main>
    </div>
  );
}
