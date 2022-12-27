import { ReactNode } from "react";
import { Center } from "../FlexBoxes/Center/Center";
import { thickBorder } from "../GlobalStyles/globalStyles";
import { InvisibleButton } from "../InvisibleButton/InvisibleButton";

export const RoundButton = ({
  color,
  backgroundColor,
  onClick,
  onMouseDown,
  onMouseUp,
  disabled,
  children,
  size,
}: {
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  disabled?: boolean;
  children: ReactNode;
  size?: number;
}): JSX.Element => {
  const roundButtonStyle = {
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "bold",
    height: size ?? "40px",
    width: size ?? "40px",
    borderRadius: "100%",
    border: thickBorder,
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <InvisibleButton
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div style={roundButtonStyle}>
        <Center horizontal vertical>
          {children}
        </Center>
      </div>
    </InvisibleButton>
  );
};
