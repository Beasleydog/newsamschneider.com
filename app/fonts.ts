import { Jersey_15 } from "next/font/google";
import { PT_Serif } from "next/font/google";
import { Rammetto_One } from "next/font/google";
import { Luckiest_Guy } from "next/font/google";
import localFont from "next/font/local";

const jersey15 = Jersey_15({
  subsets: ["latin"],
  weight: ["400"],
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const rammettoOne = Rammetto_One({
  subsets: ["latin"],
  weight: ["400"],
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: ["400"],
});

const berlinSansFBDemi = localFont({
  src: "../public/BRLNSDB.ttf",
});

export { jersey15, ptSerif, rammettoOne, luckiestGuy, berlinSansFBDemi };
