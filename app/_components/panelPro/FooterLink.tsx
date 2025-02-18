import * as React from "react";
import { FooterLinkProps } from "./types";

export const FooterLink: React.FC<FooterLinkProps> = ({ text }) => (
  <div className="mt-4 text-base tracking-wide leading-relaxed text-white text-opacity-70">
    {text}
  </div>
);
