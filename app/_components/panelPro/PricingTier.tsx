import * as React from "react";
import { PricingTierProps } from "./types";

export const PricingTier: React.FC<PricingTierProps> = ({
  name,
  features,
  price,
  buttonText,
  isHighlighted,
  savingsText,
}) => (
  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
    <div
      className={`flex flex-col items-start px-7 py-6 mx-auto w-full rounded-3xl shadow-lg max-md:px-5 max-md:mt-10 ${
        isHighlighted ? "bg-cyan-800" : "bg-white"
      }`}
    >
      <div className="flex gap-5 justify-between self-stretch w-full font-bold">
        <div
          className={`text-2xl ${isHighlighted ? "text-white" : "text-black"}`}
        >
          {name}
        </div>
        {savingsText && (
          <div className="overflow-hidden gap-2.5 self-start px-2 py-1.5 text-xs text-violet-600 bg-white rounded">
            {savingsText}
          </div>
        )}
      </div>
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex gap-4 mt-${index === 0 ? "6" : "4"} text-base ${
            isHighlighted ? "text-white" : "text-black"
          }`}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc3b40192ea2f34f72a01c4751c50c19f9aecfad90387c59cdaee5c74225df16?placeholderIfAbsent=true&apiKey=29a73afb14654dba9949ec01adec667c"
            alt=""
            className="object-contain shrink-0 self-start w-5 rounded-none aspect-[1.25]"
          />
          <div>{feature}</div>
        </div>
      ))}
      <div
        className={`flex overflow-hidden gap-1 items-end mt-6 ${
          isHighlighted ? "text-white" : "text-black"
        }`}
      >
        <div className="text-2xl font-bold">
          <span className="text-lg">${price}</span>
        </div>
        <div className="text-base">/month</div>
      </div>
      <button
        className={`self-stretch px-16 py-4 mt-4 text-base font-bold text-center rounded-lg max-md:px-5 ${
          isHighlighted
            ? "bg-slate-400 text-white"
            : "bg-green-100 text-slate-400"
        }`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);
