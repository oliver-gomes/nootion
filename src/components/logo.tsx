import { cn } from "@/lib/utils";
import { PT_Serif } from "next/font/google";

const pt_serif = PT_Serif({ weight: "700", subsets: ["cyrillic"] });

export const Logo = () => {
  return <div className={cn(pt_serif.className, "text-2xl")}>nootion.</div>;
};
