import { ReactNode, useMemo } from "react";
import {
  leftHalfCircleStyle,
  middleBoxStyle,
  pillStyle,
  rightHalfCircleStyle,
} from "./pillStyles";

export const Pill = ({
  children,
  onClick,
  border,
}: {
  children: ReactNode;
  onClick?: () => void;
  border?: "thick" | "thin";
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const middleStyle = useMemo(() => {
    const clickable = onClick !== undefined;
    return middleBoxStyle(clickable, border);
  }, [onClick, border]);
  const leftStyle = useMemo(() => {
    return leftHalfCircleStyle(border);
  }, [border]);
  const rightStyle = useMemo(() => {
    return rightHalfCircleStyle(border);
  }, [border]);

  return (
    <div onClick={handleClick} style={pillStyle}>
      <div style={leftStyle}></div>
      <div style={middleStyle}>{children}</div>
      <div style={rightStyle}></div>
    </div>
  );
};
