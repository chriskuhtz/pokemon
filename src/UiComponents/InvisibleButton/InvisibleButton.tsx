import { ReactNode } from "react";
import { invisibleButtonStyle } from "./invisibleButtonStyle";

export const InvisibleButton = ({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <button disabled={disabled} style={invisibleButtonStyle} onClick={onClick}>
      {children}
    </button>
  );
};
