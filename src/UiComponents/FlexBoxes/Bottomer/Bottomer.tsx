import { ReactNode } from "react";
import { bottomerStyle } from "./bottomerStyle";

export const Bottomer = ({ children }: { children: ReactNode }) => {
  return <div style={bottomerStyle}>{children}</div>;
};
