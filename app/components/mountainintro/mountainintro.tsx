import { berlinSansFBDemi, luckiestGuy } from "@/app/fonts";
import { useWindowWidth } from "@/app/helpers/useWindowWidth";

export default function MountainIntro() {
  const small = useWindowWidth() < 1000;

  if (small) {
    return <MobileMountainIntro />;
  }

  // When small, use vw sizing; otherwise use rem sizing.
  const titleSize = "text-[8.1rem]";
  const containerSize = "h-[11rem] w-[59rem]";
  const factsTextSize = "text-[3.5rem]";

  return (
    <div className="w-full overflow-hidden relative h-screen">
      <div className="h-full absolute top-0 bg-gradient-to-b from-transparent to-[#faf8f8] z-10 w-full w-[2000px]"></div>
      <video
        src="/intro/mountains.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-[-820px] z-0 blur-sm min-w-[2000px] w-full object-cover blur"
      />

      <div className="absolute top-0 left-0 w-screen h-full z-10 flex flex-col items-center gap-8 justify-center">
        <div className={`relative ${containerSize}`}>
          {/* White copy without stroke */}
          <div
            className={`${titleSize} text-white font-bold ${luckiestGuy.className} absolute top-0 left-0 z-20`}
            style={{
              WebkitTextStroke: "0px",
              fontWeight: "unset",
            }}
          >
            sam schneider
          </div>
          {/* Black copy with stroke; note the outline scales conditionally */}
          <div
            className={`${titleSize} text-black font-bold ${luckiestGuy.className} absolute top-0 left-0 z-10`}
            style={{
              WebkitTextStroke: "35px",
              transform: "translate(0px,0px)",
              fontWeight: "unset",
            }}
          >
            sam schneider
          </div>
        </div>
        <div
          className={`flex flex-col items-center ${factsTextSize} font-bold z-10 text-black ${berlinSansFBDemi.className}`}
        >
          <div className="leading-[1] flex items-center gap-2 whitespace-nowrap">
            doin CS at umich <Mich small={false} /> i'm a big fan of
          </div>
          <div className="leading-[1] flex items-center gap-2 whitespace-nowrap">
            cooking <Cooking small={false} /> and coding{" "}
            <Coding small={false} /> i enjoy
          </div>
          <div className="leading-[1] flex items-center gap-2 whitespace-nowrap">
            using AI <AI small={false} /> to learn new things
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMountainIntro() {
  return (
    <div className="w-full overflow-hidden relative pt-[18vw] pb-[14vw] px-[4vw]">
      <video
        src="/intro/mountains.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover blur-sm"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf8f8] z-10"></div>

      <div className="relative z-20">
        {/* Title */}
        <div className="relative leading-[0.95]">
          <h1
            className={`${luckiestGuy.className} text-white relative z-20`}
            style={{ fontSize: "17vw", lineHeight: "0.95" }}
          >
            sam
            <br />
            schneider
          </h1>
          <h1
            className={`${luckiestGuy.className} text-black absolute inset-0 z-10`}
            style={{
              fontSize: "17vw",
              lineHeight: "0.95",
              WebkitTextStroke: "4.5vw black",
            }}
          >
            sam
            <br />
            schneider
          </h1>
        </div>

        {/* Tagline with inline icons, same copy as desktop */}
        <p
          className={`${berlinSansFBDemi.className} text-black font-bold mt-[6vw]`}
          style={{ fontSize: "5.5vw", lineHeight: 1.3 }}
        >
          doin CS at umich{" "}
          <InlineIcon>
            <Mich small />
          </InlineIcon>{" "}
          i'm a big fan of cooking{" "}
          <InlineIcon>
            <Cooking small />
          </InlineIcon>{" "}
          and coding{" "}
          <InlineIcon>
            <Coding small />
          </InlineIcon>{" "}
          i enjoy using AI{" "}
          <InlineIcon>
            <AI small />
          </InlineIcon>{" "}
          to learn new things
        </p>
      </div>
    </div>
  );
}

function InlineIcon({ children }: { children: React.ReactNode }) {
  return <span className="inline-block align-middle">{children}</span>;
}

interface IconProps {
  small: boolean;
}

function Mich({ small }: IconProps) {
  // For small screens, use reduced vw sizing.
  const heightClass = small ? "h-[7vw]" : "h-[3.8rem]";
  const widthClass = small ? "w-[9vw]" : "w-[5rem]";
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
  const heightClass = small ? "h-[7vw]" : "h-[3.8rem]";
  const widthClass = small ? "w-[9vw]" : "w-[5rem]";
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
  const containerWidth = small ? "w-[14vw]" : "w-[5.5rem]";
  const circleSize = small ? "w-[7vw] h-[7vw]" : "w-[3.5rem] h-[3.5rem]";
  const offset = small ? "left-[3.5vw]" : "left-[1.1rem]";
  const secondOffset = small ? "left-[7vw]" : "left-[2.2rem]";
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
  const containerWidth = small ? "w-[17vw]" : "w-[6.7rem]";
  const circleSize = small ? "w-[7vw] h-[7vw]" : "w-[3.5rem] h-[3.5rem]";
  const offset = small ? "left-0" : "left-0";
  const offset1 = small ? "left-[3.3vw]" : "left-[1.1rem]";
  const offset2 = small ? "left-[6.6vw]" : "left-[2.2rem]";
  const offset3 = small ? "left-[10vw]" : "left-[3.3rem]";
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
