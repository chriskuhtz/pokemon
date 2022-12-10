import { TrainerCard } from "../../../Components/TrainerCard/TrainerCard";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useGetPlayerQuery } from "../../../services/internal";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";

export const TrainerOverview = ({}: {}): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data: player } = useGetPlayerQuery(currentId);

  if (!currentId) {
    return <ErrorScreen text="currentId missing" />;
  }
  if (!player) {
    return <ErrorScreen text="player data missing" />;
  }
  return (
    <div style={{ height: "100vh" }}>
      {" "}
      <Center vertical horizontal>
        <TrainerCard trainer={player} />
      </Center>
    </div>
  );
};
