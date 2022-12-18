import { ReactNode } from "react";
import { InvisibleButton } from "../../UiComponents/InvisibleButton/InvisibleButton";
import { Pill } from "../../UiComponents/Pill/Pill";

export const Button = ({
  children,
  disabled,
  onClick,
  fullWidth,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}): JSX.Element => {
  return (
    <Pill border={"thick"}>
      <InvisibleButton
        onClick={onClick}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {children}{" "}
      </InvisibleButton>
    </Pill>
  );
};
