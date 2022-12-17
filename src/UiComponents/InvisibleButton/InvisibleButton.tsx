import { ReactNode, useMemo } from "react";
import { invisibleButtonStyle } from "./invisibleButtonStyle";

export const InvisibleButton = ({
  children,
  onClick,
  disabled,
  fullWidth,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}): JSX.Element => {
  const style = useMemo(() => invisibleButtonStyle(fullWidth), [fullWidth]);
  return (
    <button disabled={disabled} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
