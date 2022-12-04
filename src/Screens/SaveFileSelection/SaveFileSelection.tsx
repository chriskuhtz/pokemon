import { useNavigate } from "react-router-dom";
import { TrainerCard } from "../../Components/TrainerCard/TrainerCard";
import { setCurrentPlayerId } from "../../functions/handleCurrentPlayerId";
import { ROUTES } from "../../routes";
import { useGetPlayersQuery } from "../../services/player";
import { BottomContent } from "../../UiComponents/BottomContent/BottomContent";
import { InvisibleButton } from "../../UiComponents/InvisibleButton/InvisibleButton";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { newGameButton, saveFilesBox } from "./saveFileSelectionStyle";

export const SaveFileSelection = () => {
  const navigate = useNavigate();
  const { data: players, isLoading } = useGetPlayersQuery();

  const loadGame = (id: number) => {
    setCurrentPlayerId(id);
  };

  const startNewGame = () => {
    navigate(ROUTES.INTRO);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!players) {
    return <ErrorScreen />;
  }

  console.log(players);

  return (
    <BottomContent
      justifyContent="space-between"
      bottomContent={
        <InvisibleButton onClick={startNewGame}>
          <div style={newGameButton}>New game</div>
        </InvisibleButton>
      }
    >
      <div style={saveFilesBox}>
        {players.map((p) => (
          <InvisibleButton disabled onClick={() => loadGame(p.id)}>
            <TrainerCard trainer={p} />
          </InvisibleButton>
        ))}
      </div>
    </BottomContent>
  );
};
