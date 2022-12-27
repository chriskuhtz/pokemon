import { ReactNode, useMemo } from "react";
import { invisibleButtonStyle } from "./invisibleButtonStyle";

export const InvisibleButton = ({
  children,
  onClick,
  disabled,
  fullWidth,
  onMouseDown,
  onMouseUp,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}): JSX.Element => {
  const style = useMemo(() => invisibleButtonStyle(fullWidth), [fullWidth]);

  const handleMouseDown = () => {
    if (onMouseDown) {
      onMouseDown();
    }
  };
  const handleMouseUp = () => {
    if (onMouseUp) {
      onMouseUp();
    }
  };

  return (
    <button
      disabled={disabled}
      style={style}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </button>
  );
};
