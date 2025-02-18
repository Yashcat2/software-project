import * as React from "react";
import { SocialIconProps } from "./types";

export const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="object-contain shrink-0 aspect-square w-[18px]"
  />
);
