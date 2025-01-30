import { motion } from "framer-motion";

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Waves() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="w-[3000px] h-screen overflow-hidden relative pt-24 left-0">
      <div className="h-full absolute top-0 bg-gradient-to-b from-[#faf8f8] to-transparent z-10 w-full w-[3000px]"></div>
      <div className="h-full absolute top-0 bg-gradient-to-b from-[transparent] to-[#00000085] z-10 w-full w-[3000px]"></div>
      <a
        href="mailto:samschneider8306@gmail.com"
        className="hover:underline text-white text-xl text-left w-screen absolute z-30 left-1/2 -translate-x-1/2 bottom-[10px] ml-[20px]"
      >
        samschneider8306@gmail.com
      </a>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  delay: 1,
                },
              }
            : {}
        }
        className="absolute bottom-[200px] left-0 right-0 text-center text-[4rem] text-white font-semibold z-20 text-shadow"
      >
        thanks for visiting
      </motion.div>
      <video
        src="/waves.mp4"
        autoPlay
        loop
        muted
        className="absolute left-1/2 -translate-x-1/2 bottom-[-300px] z-0 blur-sm min-w-[3000px] w-[3000px] object-cover"
      />
    </div>
  );
}
