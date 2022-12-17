import { ReactNode } from "react";
import { InvisibleButton } from "../../UiComponents/InvisibleButton/InvisibleButton";
import { Pill } from "../../UiComponents/Pill/Pill";

export const Button = ({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}): JSX.Element => {
  return (
    <InvisibleButton onClick={onClick} disabled={disabled}>
      <Pill border={"thick"}>{children}</Pill>
    </InvisibleButton>
  );
};
