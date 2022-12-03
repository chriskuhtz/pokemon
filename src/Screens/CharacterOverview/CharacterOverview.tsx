import { useNavigate } from "react-router-dom";
import { TrainerCard } from "../../Components/TrainerCard/TrainerCard";
import { useGetPlayerQuery } from "../../services/player";
import { BottomContent } from "../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { TextBox } from "../../UiComponents/TextBox/TextBox";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { characterOverviewBox } from "./characterOverviewStyle";

export const CharacterOverview = () => {
  const { data, isLoading } = useGetPlayerQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <ErrorScreen />;
  }

  return (
    <BottomContent
      bottomContent={<TextBox text={`I see, so you are ${data.name}.`} />}
    >
      <Bottomer>
        <Center>
          <div style={characterOverviewBox}>
            <img
              alt="oak"
              src={process.env.PUBLIC_URL + "/assets/oak.jpeg"}
              height="250px"
            />
            <TrainerCard trainer={data} />
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
