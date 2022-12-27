import { useNavigate } from "react-router-dom";
import { TrainerCard } from "../../../Components/TrainerCard/TrainerCard";
import { setCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { ROUTES } from "../../../routes";
import { useGetPlayersQuery } from "../../../services/internal";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { InvisibleButton } from "../../../UiComponents/InvisibleButton/InvisibleButton";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";
import { LoadingScreen } from "../../LoadingScreen/LoadingScreen";
import { newGameButton, saveFilesBox } from "./saveFileSelectionStyle";

export const SaveFileSelection = () => {
  const navigate = useNavigate();
  const { data: players, isLoading } = useGetPlayersQuery();

  const loadGame = (id: number) => {
    setCurrentPlayerId(id);
    navigate(ROUTES.OVERWORLD);
  };

  const startNewGame = () => {
    navigate(ROUTES.INTRO);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!players) {
    return (
      <ErrorScreen
        text="/players call failed, turn on the json server
    "
      />
    );
  }

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
          <InvisibleButton onClick={() => loadGame(p.id)} key={p.id}>
            <TrainerCard trainer={p} />
          </InvisibleButton>
        ))}
      </div>
    </BottomContent>
  );
};
