import * as React from "react";
import { FAQItemProps } from "./types";

export const FAQItem: React.FC<FAQItemProps> = ({ question }) => (
  <div className="flex flex-col w-full max-w-[540px] max-md:max-w-full">
    <div className="flex shrink-0 h-px bg-slate-600 max-md:max-w-full" />
    <div className="flex flex-wrap gap-5 justify-between mt-4 max-md:max-w-full">
      <div>{question}</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f60b129a382ef47ce2f2b145594fcd50502fd6312ee70483b778966e1ccb3e73?placeholderIfAbsent=true&apiKey=29a73afb14654dba9949ec01adec667c"
        alt=""
        className="object-contain shrink-0 self-start mt-1.5 w-3.5 aspect-[0.64]"
      />
    </div>
  </div>
);
