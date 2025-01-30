import { size, gap } from "../bento";

export default function Bowling() {
  return (
    <div
      className="bg-[#ebcc8b] rounded-lg p-4 relative overflow-hidden"
      style={{
        height: `${size - gap / 2}px`,
        width: `${size - gap}px`,
      }}
    >
      <div className="text-[1.1rem] font-bold text-[#756645] text-center">
        my best <br />
        bowling score is
      </div>
      <div className="text-[4.5rem] font-bold text-[#3b3323] text-center -mt-4">
        289
      </div>
      <div
        className="w-[3.9rem] h-[3.3rem] absolute bottom-0 left-0"
        style={{
          background: `url('/bowlingball.png')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="w-[6rem] h-[7rem] absolute bottom-[-3rem] right-[-0.8rem]"
        style={{
          background: `url('/pins.png')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
