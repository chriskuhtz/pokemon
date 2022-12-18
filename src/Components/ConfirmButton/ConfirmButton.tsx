import { BsCheckLg } from "react-icons/bs";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { InvisibleButton } from "../../UiComponents/InvisibleButton/InvisibleButton";
import { confirmButtonStyle } from "./confirmButtonStyle";

export const ConfirmButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <InvisibleButton onClick={onClick} disabled={disabled}>
      <div style={confirmButtonStyle}>
        <Center horizontal vertical>
          <BsCheckLg />
        </Center>
      </div>
    </InvisibleButton>
  );
};
