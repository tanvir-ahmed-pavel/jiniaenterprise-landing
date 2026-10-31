import { Hind_Siliguri } from "next/font/google";

/** Bangla text only: imported by the /bn layout alone, so English pages never download it. */
export const banglaFont = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});
