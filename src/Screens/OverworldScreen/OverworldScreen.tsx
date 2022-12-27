import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { CurrentMap } from "./components/CurrentMap/CurrentMap";
import { MenuButton } from "./components/MenuButton/MenuButton";
import { MovementAndActionButtons } from "./components/MovementAndActionButtons/MovementAndActionButtons";
import { Player } from "./components/Player/Player";
import { useOverworldScreen } from "./hooks/useOverworldScreen";

const size = Math.min(
  Math.floor(window.innerWidth / 15),
  Math.floor(window.innerHeight / 9)
);

export const OverWorldScreen = (): JSX.Element => {
  const {
    position,
    playerOrientation,
    setIsButtonHeld,
    setNextMovement,
    handleActionButtonClick,
    mapData,
    isFetching,
  } = useOverworldScreen();

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MenuButton
        playerLocation={{
          mapId: mapData.id,
          playerOrientation: playerOrientation,
          position: position,
        }}
      />
      <MovementAndActionButtons
        size={size}
        handleActionButtonClick={handleActionButtonClick}
        setNextMovement={setNextMovement}
        setIsButtonHeld={setIsButtonHeld}
      />
      <Player size={size} orientation={playerOrientation} />
      <CurrentMap map={mapData.map} size={size} position={position} />
    </>
  );
};
