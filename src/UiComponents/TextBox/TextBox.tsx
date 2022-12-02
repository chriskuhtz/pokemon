import { useMemo } from "react";
import {
  leftHalfCircleStyle,
  middleBoxStyle,
  rightHalfCircleStyle,
  textBoxStyle,
} from "./textBoxStyles";

export const TextBox = ({
  text,
  onClick,
}: {
  text: string | JSX.Element;
  onClick?: () => void;
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const middleStyle = useMemo(() => {
    const clickable = onClick !== undefined;
    return middleBoxStyle(clickable);
  }, [onClick]);

  return (
    <div onClick={handleClick} style={textBoxStyle}>
      <div style={leftHalfCircleStyle}></div>
      <div style={middleStyle}>{text}</div>
      <div style={rightHalfCircleStyle}></div>
    </div>
  );
};
