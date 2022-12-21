import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { Center } from "../../../../UiComponents/FlexBoxes/Center/Center";
import { InvisibleButton } from "../../../../UiComponents/InvisibleButton/InvisibleButton";
import { menuButtonStyle } from "./menuButtonStyle";

export const MenuButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <InvisibleButton onClick={() => navigate(ROUTES.PLAYERMENU)}>
      <div style={menuButtonStyle}>
        <Center horizontal vertical>
          <BiMenu size={"large"} />
        </Center>
      </div>
    </InvisibleButton>
  );
};
