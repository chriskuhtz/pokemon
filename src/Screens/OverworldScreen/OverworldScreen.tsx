import { useMultiTextBox } from "../../hooks/useMultiTextBox/useMultiTextBox";
import { absolutePosition } from "../../UiComponents/GlobalStyles/globalStyles";
import { Pill } from "../../UiComponents/Pill/Pill";
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
    paragraphs,
    setParagraphs,
  } = useOverworldScreen();

  const displayTextBox = paragraphs.length > 0;

  const { index, handleClick } = useMultiTextBox(paragraphs, () =>
    setParagraphs([])
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div
        style={{
          display: displayTextBox ? "none" : "block",
        }}
      >
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
        />{" "}
      </div>
      <Player size={size} orientation={playerOrientation} />
      <CurrentMap map={mapData.map} size={size} position={position} />
      <div
        style={{
          position: absolutePosition,
          bottom: "0",
          width: "calc(100% - 2rem)",
          padding: "1rem",
          zIndex: 3,
          display: displayTextBox ? "block" : "none",
        }}
      >
        {" "}
        <Pill onClick={handleClick}>{paragraphs[index]}</Pill>
      </div>
    </>
  );
};
