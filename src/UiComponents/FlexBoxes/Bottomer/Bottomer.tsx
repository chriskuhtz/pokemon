import { ReactElement } from "react";
import { bottomerStyle } from "./bottomerStyle";

export const Bottomer = ({ children }: { children: ReactElement }) => {
  return <div style={bottomerStyle}>{children}</div>;
};
