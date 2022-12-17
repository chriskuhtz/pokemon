import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TrainerCard } from "../../../Components/TrainerCard/TrainerCard";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { ROUTES } from "../../../routes";
import { useGetPlayerQuery } from "../../../services/internal";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";
import { LoadingScreen } from "../../LoadingScreen/LoadingScreen";
import { characterOverviewBox } from "./characterOverviewStyle";

export const CharacterOverview = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data, isLoading } = useGetPlayerQuery(currentId);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <ErrorScreen />;
  }

  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={
        <Pill onClick={() => navigate(ROUTES.STARTERSELECTION)}>
          I see, so you are {data.name}.
        </Pill>
      }
    >
      <Bottomer>
        <Center horizontal>
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
