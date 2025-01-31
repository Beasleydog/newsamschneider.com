import { useWindowWidth } from "@/app/helpers/useWindowWidth";
import { motion } from "framer-motion";

import { useInView } from "framer-motion";
import { useRef } from "react";
export default function Waves() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const small = useWindowWidth() < 768;

  return (
    <div className="w-[3000px] h-screen overflow-hidden relative pt-24 left-0">
      <div className="h-full absolute top-0 bg-gradient-to-b from-[#faf8f8] to-transparent z-10 w-full w-[3000px]"></div>
      <div className="h-full absolute top-0 bg-gradient-to-b from-[transparent] to-[#00000085] z-10 w-full w-[3000px]"></div>

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
        className={`absolute left-0 right-0 text-center ${
          small ? "text-[8vw] bottom-[20vw]" : "text-[4rem] bottom-[200px]"
        } text-white font-semibold z-20 text-shadow`}
      >
        thanks for visiting
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 2,
                  delay: 2.2,
                },
              }
            : {}
        }
        className={`absolute left-0 right-0 text-center ${
          small ? "text-[4vw] bottom-[15vw]" : "text-[2rem] bottom-[150px]"
        } text-white font-semibold z-20 text-shadow`}
      >
        come back anytime
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
