import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { InvisibleButton } from "../../UiComponents/InvisibleButton/InvisibleButton";
import { backButtonStyle } from "./backButtonStyle";

export const BackButton = ({ route }: { route?: string }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <InvisibleButton onClick={() => (route ? navigate(route) : navigate(-1))}>
      <div style={backButtonStyle}>
        <Center horizontal vertical>
          <IoIosArrowBack />
        </Center>
      </div>
    </InvisibleButton>
  );
};
