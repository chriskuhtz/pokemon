import { ReactElement } from "react";
import { centerStyle } from "./centerStyle";

export const Center = ({ children }: { children: ReactElement }) => {
  return <div style={centerStyle}>{children}</div>;
};
