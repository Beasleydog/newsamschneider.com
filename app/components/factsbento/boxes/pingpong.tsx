import { size, gap } from "../bento";

export default function PingPong() {
  return (
    <div
      className={`relative bg-[#a860e8] rounded-lg overflow-hidden text-[4.7rem] font-bold p-4 text-[#3e2a06]`}
      style={{
        height: `${size - gap / 2}px`,
        width: `${size * 2 - gap}px`,
        backgroundImage: `url('/pingpong.png')`,
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <span className="text-center text-[1.8rem] font-bold text-[#673b8e]">
          i'm good at ping pong
        </span>
        <span className="w-full text-center text-[6rem] text-white font-bold leading-10">
          21 - 0
        </span>
      </div>
    </div>
  );
}
