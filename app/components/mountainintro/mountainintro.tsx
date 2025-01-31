import { berlinSansFBDemi, luckiestGuy } from "@/app/fonts";
import { useWindowWidth } from "@/app/helpers/useWindowWidth";

export default function MountainIntro() {
  const small = useWindowWidth() < 1000;

  // When small, use vw sizing; otherwise use rem sizing.
  const titleSize = small ? "text-[15vw]" : "text-[8.1rem]";
  const containerSize = small
    ? "h-[40vw] w-[80vw] text-center leading-[1]"
    : "h-[11rem] w-[59rem]";
  const factsTextSize = small ? "text-[5vw]" : "text-[3.5rem]";

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="h-full absolute top-0 bg-gradient-to-b from-transparent to-[#faf8f8] z-10 w-full w-[2000px]"></div>
      <video
        src="/intro/mountains.mp4"
        autoPlay
        loop
        muted
        className="absolute bottom-[-820px] z-0 blur-sm min-w-[2000px] w-full object-cover blur"
      />

      <div
        className={`absolute top-0 left-0 w-screen h-full z-10 flex flex-col justify-center items-center ${
          small ? "gap-2" : "gap-8"
        }`}
      >
        <div className={`relative ${containerSize}`}>
          {/* White copy without stroke */}
          <div
            className={`${titleSize} text-white font-bold ${luckiestGuy.className} absolute top-0 left-0 z-20`}
            style={{
              WebkitTextStroke: "0px",
              fontWeight: "unset",
            }}
          >
            sam {small && <br />} schneider
          </div>
          {/* Black copy with stroke; note the outline scales conditionally */}
          <div
            className={`${titleSize} text-black font-bold ${luckiestGuy.className} absolute top-0 left-0 z-10`}
            style={{
              WebkitTextStroke: small ? "4vw" : "35px",
              transform: "translate(0px,0px)",
              fontWeight: "unset",
            }}
          >
            sam{small && <br />} schneider
          </div>
        </div>
        <div
          className={`flex flex-col items-center ${factsTextSize} font-bold z-10 text-black ${berlinSansFBDemi.className}`}
        >
          <div className="leading-[1] flex items-center gap-2">
            doin CS at umich <Mich small={small} /> i'm a big fan of
          </div>
          <div className="leading-[1] flex items-center gap-2">
            cooking <Cooking small={small} /> and coding{" "}
            <Coding small={small} /> i enjoy
          </div>
          <div className="leading-[1] flex items-center gap-2">
            using AI <AI small={small} /> to learn new things
          </div>
        </div>
      </div>
    </div>
  );
}

interface IconProps {
  small: boolean;
}

function Mich({ small }: IconProps) {
  // For small screens, use reduced vw sizing.
  const heightClass = small ? "h-[8vw]" : "h-[3.8rem]";
  const widthClass = small ? "w-[10vw]" : "w-[5rem]";
  return (
    <div
      className={`${heightClass} ${widthClass} bg-[#01264a] rounded-[1.5rem] mt-[0.5rem]`}
      style={{
        backgroundImage: "url(/intro/mich.png)",
        backgroundSize: small ? "50%" : "65%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}

function Cooking({ small }: IconProps) {
  const heightClass = small ? "h-[8vw]" : "h-[3.8rem]";
  const widthClass = small ? "w-[10vw]" : "w-[5rem]";
  return (
    <div
      className={`${heightClass} ${widthClass} bg-white rounded-[1.5rem] mt-[0.5rem] shadow`}
      style={{
        backgroundImage: "url(/intro/cook.png)",
        backgroundSize: small ? "60%" : "70%",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}

function Coding({ small }: IconProps) {
  const containerHeight = small ? "h-[7vw]" : "h-[3.5rem]";
  const containerWidth = small ? "w-[9vw]" : "w-[5.5rem]";
  const circleSize = small ? "w-[7vw] h-[7vw]" : "w-[3.5rem] h-[3.5rem]";
  const offset = small ? "left-[calc(0.3*9vw)]" : "left-[1.1rem]";
  const secondOffset = small ? "left-[calc(0.6*9vw)]" : "left-[2.2rem]";
  return (
    <div
      className={`relative mt-[0.5rem] ${containerHeight} ${containerWidth}`}
    >
      <div
        className={`absolute rounded-full shadow bg-white ${circleSize} left-0`}
        style={{
          backgroundImage: "url(/intro/react.png)",
          backgroundSize: small ? "75%" : "87%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className={`absolute rounded-full shadow bg-[#71b123] ${circleSize} ${offset}`}
        style={{
          backgroundImage: "url(/intro/nodejs.png)",
          backgroundSize: small ? "70%" : "83%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className={`absolute rounded-full shadow bg-white ${circleSize} ${secondOffset}`}
        style={{
          backgroundImage: "url(/intro/gas.png)",
          backgroundSize: small ? "70%" : "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function AI({ small }: IconProps) {
  const containerHeight = small ? "h-[7vw]" : "h-[3.5rem]";
  const containerWidth = small ? "w-[9vw]" : "w-[6.7rem]";
  const circleSize = small ? "w-[7vw] h-[7vw]" : "w-[3.5rem] h-[3.5rem]";
  const offset = small ? "left-[calc(0.3*9vw)]" : "left-0";
  const offset1 = small ? "left-[calc(0.5*9vw)]" : "left-[1.1rem]";
  const offset2 = small ? "left-[calc(0.7*9vw)]" : "left-[2.2rem]";
  const offset3 = small ? "left-[calc(0.9*9vw)]" : "left-[3.3rem]";
  return (
    <div
      className={`relative mt-[0.5rem] ${containerHeight} ${containerWidth}`}
    >
      <div
        className={`absolute rounded-full shadow bg-white ${circleSize} ${offset}`}
        style={{
          backgroundImage: "url(/intro/closedai.png)",
          backgroundSize: small ? "75%" : "87%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className={`absolute rounded-full shadow bg-[#eaeaff] ${circleSize} ${offset1}`}
        style={{
          backgroundImage: "url(/intro/aistudio.webp)",
          backgroundSize: small ? "60%" : "70%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className={`absolute rounded-full shadow bg-white ${circleSize} ${offset2}`}
        style={{
          backgroundImage: "url(/intro/deepseek.png)",
          backgroundSize: small ? "70%" : "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className={`absolute rounded-full shadow bg-[#f6f6f6] ${circleSize} ${offset3}`}
        style={{
          backgroundImage: "url(/intro/claude.png)",
          backgroundSize: small ? "65%" : "75%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
