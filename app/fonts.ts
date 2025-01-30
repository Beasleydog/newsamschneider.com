import { Jersey_15 } from "next/font/google";
import { PT_Serif } from "next/font/google";
import { Rammetto_One } from "next/font/google";
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

export { jersey15, ptSerif, rammettoOne };
