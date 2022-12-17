import { useNavigate } from "react-router-dom";
import { TrainerCard } from "../../../Components/TrainerCard/TrainerCard";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { ROUTES } from "../../../routes";
import { useGetPlayerQuery } from "../../../services/internal";
import { Button } from "../../../UiComponents/Button/Button";
import { Container } from "../../../UiComponents/Container/Container";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";

export const PlayerMenu = (): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data: player } = useGetPlayerQuery(currentId);
  const navigate = useNavigate();

  if (!player) {
    return <ErrorScreen text="could not get Playerdata" />;
  }

  return (
    <Container>
      <Center>
        <div style={{ flexGrow: 3, overflow: "scroll", height: "92vh" }}>
          <Button onClick={() => navigate(ROUTES.POKEDEX)}>Pokedex</Button>
        </div>
        <div style={{ flexGrow: 2, paddingLeft: "0.5rem" }}>
          <TrainerCard trainer={player} />
        </div>
      </Center>
    </Container>
  );
};
