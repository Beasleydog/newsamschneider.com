import { size, gap } from "../bento";

export default function Beasley() {
  return (
    <div
      className="bg-[#75f1eb] rounded-lg"
      style={{
        height: `${size - gap / 2}px`,
        width: `${size}px`,
        backgroundImage: `url('/beasley.png')`,
        backgroundSize: "80%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
