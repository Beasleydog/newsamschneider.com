import { size } from "../bento";

export default function Burgers() {
  return (
    <div
      className={`overflow-hidden relative bg-[#7b86ff] rounded-lg text-[2.7rem] p-4 text-white`}
      style={{
        height: `${size * 2}px`,
        width: `${size}px`,
      }}
    >
      i make <br />
      and eat <br />
      burgers
      <img src="/burger.png" className="absolute bottom-0 right-0 w-full" />
    </div>
  );
}
