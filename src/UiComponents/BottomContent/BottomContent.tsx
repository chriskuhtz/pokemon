import { ReactElement } from "react";
import {
  bottomContentStyle,
  mainContentStyle,
  outerBoxStyle,
} from "./bottomContentStyle";

export const BottomContent = ({
  children,
  bottomContent,
}: {
  children: ReactElement;
  bottomContent: ReactElement;
}) => {
  return (
    <div style={outerBoxStyle}>
      <div style={mainContentStyle}>{children}</div>
      <div style={bottomContentStyle}>{bottomContent}</div>
    </div>
  );
};
