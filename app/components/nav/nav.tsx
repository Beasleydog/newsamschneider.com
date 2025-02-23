import { luckiestGuy } from "@/app/fonts";
import { useWindowWidth } from "@/app/helpers/useWindowWidth";

export default function Nav() {
  const small = useWindowWidth() < 870;

  // Use viewport-based values when the window is small
  const textSize = small ? "text-[3vw]" : "text-[1.5rem]";
  const paddingX = small ? "px-[4vw]" : "px-8";
  const paddingY = small ? "py-[1vw]" : "py-1";
  const topPosition = small ? "top-[3vw]" : "top-8";
  const dividerHeight = small ? "h-[3vw]" : "h-[1.5rem]";
  const dividerWidth = small ? "w-[0.5vw]" : "w-[2px]";
  const iconGitHub = small ? "h-[3vw] w-[3vw]" : "h-[1.5rem] w-[1.5rem]";
  const iconEmail = small ? "w-[4vw]" : "w-[2rem]";

  return (
    <div
      className={`w-max flex gap-4 ${luckiestGuy.className} ${textSize} text-black/50 fixed ${topPosition} left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-lg justify-center items-center z-30 ${paddingX} ${paddingY} rounded-full`}
    >
      <div
        className="hover:text-black/70 cursor-pointer"
        onClick={() => ScrollToId("career")}
      >
        EXPERIENCE
      </div>
      <div
        className="hover:text-black/70 cursor-pointer"
        onClick={() => ScrollToId("games")}
      >
        GAMES
      </div>
      <div
        className="hover:text-black/70 cursor-pointer"
        onClick={() => ScrollToId("projects")}
      >
        PROJECTS
      </div>
      
      {!small && (
        <div
          className="hover:text-black/70 cursor-pointer"
          onClick={() => ScrollToId("fun-facts")}
        >
          FUN FACTS
        </div>
      )}
      <div className={`${dividerHeight} ${dividerWidth} bg-black/50`} />
      <a href="https://github.com/beasleydog" target="_blank">
        <img
          src="/github.png"
          alt="gas"
          className={`${iconGitHub} opacity-50 hover:opacity-70 cursor-pointer`}
        />
      </a>
      <a href="mailto:samschneider8306@gmail.com" target="_blank">
        <img
          src="/email.webp"
          alt="gas"
          className={`${iconEmail} opacity-50 hover:opacity-70 cursor-pointer`}
        />
      </a>
    </div>
  );
}

function ScrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
