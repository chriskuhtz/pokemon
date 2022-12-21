import { useNavigate } from "react-router-dom";
import { BackButton } from "../../../Components/BackButton/BackButton";
import { TeamOverview } from "../../../Components/TeamOverview/TeamOverview";
import { TrainerCard } from "../../../Components/TrainerCard/TrainerCard";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { ROUTES } from "../../../routes";
import {
  useGetPlayerQuery,
  useGetPokedexQuery,
  useGetTeamQuery,
} from "../../../services/internal";
import { Button } from "../../../UiComponents/Button/Button";
import { Container } from "../../../UiComponents/Container/Container";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";

export const PlayerMenu = (): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data: player } = useGetPlayerQuery(currentId);
  const { data: pokedex } = useGetPokedexQuery(currentId);
  const { data: team } = useGetTeamQuery(currentId);
  const navigate = useNavigate();

  if (!player) {
    return <ErrorScreen text="could not get Playerdata" />;
  }
  if (!pokedex) {
    return <ErrorScreen text="could not get Pokedex" />;
  }
  if (!team) {
    return <ErrorScreen text="could not get Team" />;
  }

  return (
    <Container>
      <BackButton />
      <div style={{ display: "flex" }}>
        <div
          style={{
            flexGrow: 0,
            overflow: "scroll",
            paddingBottom: ".5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
          }}
        >
          <TeamOverview team={team} />
        </div>
        <div
          style={{
            flexGrow: 1,
            paddingBottom: ".5rem",
            paddingLeft: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <TrainerCard trainer={player} />
          <Button onClick={() => navigate(ROUTES.BAG)} fullWidth>
            <strong>Bag</strong>
          </Button>
          <Button onClick={() => navigate(ROUTES.POKEDEX)} fullWidth>
            <strong>Pokedex</strong>
          </Button>
        </div>
      </div>
    </Container>
  );
};
