import { ReactNode } from "react";
import {
  bottomContentStyle,
  mainContentStyle,
  outerBoxStyle,
} from "./bottomContentStyle";

export const BottomContent = ({
  children,
  bottomContent,
  justifyContent,
}: {
  children: ReactNode;
  bottomContent: ReactNode;
  justifyContent: "flex-end" | "space-between";
}) => {
  const outerBox = outerBoxStyle(justifyContent);
  return (
    <div style={outerBox}>
      <div style={mainContentStyle}>{children}</div>
      <div style={bottomContentStyle}>{bottomContent}</div>
    </div>
  );
};
