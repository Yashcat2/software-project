import * as React from "react";
import { FeatureCardProps } from "./types";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex flex-col self-stretch my-auto rounded-none min-w-[240px] w-[300px]">
    <div className="flex flex-col items-center px-8 py-10 bg-white rounded-[30px] shadow-[4px_10px_30px_rgba(0,0,0,0.03)] max-md:px-5">
      <div className="flex shrink-0 w-16 h-16 rounded-full bg-[linear-gradient(180deg,#7CBBA8_0%,#B5D5C0_100%)]" />
      <div className="mt-6 text-lg font-medium text-slate-800">{title}</div>
      <div className="self-stretch mt-6 text-base leading-7 text-zinc-500">
        {description}
      </div>
    </div>
  </div>
);
