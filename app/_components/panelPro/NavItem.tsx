import * as React from "react";
import { NavItemProps } from "./types";

export const NavItem: React.FC<NavItemProps> = ({ text }) => (
  <div className="self-stretch my-auto">{text}</div>
);
