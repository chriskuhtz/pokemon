import { invisibleButton } from "./invisibleButtonStyle";

export const InvisibleButton = ({
  children,
  onClick,
  disabled,
}: {
  children: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <button disabled={disabled} style={invisibleButton} onClick={onClick}>
      {children}
    </button>
  );
};
