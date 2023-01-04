import { useMultiTextBox } from "../../hooks/useMultiTextBox/useMultiTextBox";
import { absolutePosition } from "../../UiComponents/GlobalStyles/globalStyles";
import { Pill } from "../../UiComponents/Pill/Pill";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { CurrentMap } from "./components/CurrentMap/CurrentMap";
import { MenuButton } from "./components/MenuButton/MenuButton";
import { MovementAndActionButtons } from "./components/MovementAndActionButtons/MovementAndActionButtons";
import { Player } from "./components/Player/Player";
import { useOverworldScreen } from "./hooks/useOverworldScreen";

export const size = Math.min(
  Math.floor(window.innerWidth / 15),
  Math.floor(window.innerHeight / 9)
);
export const tickSpeed = 100;

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
    overwrittenNpcs,
    rotatingNpcs,
  } = useOverworldScreen();

  const displayTextBox = paragraphs.length > 0;

  const { index, handleClick } = useMultiTextBox(paragraphs, () =>
    setParagraphs([])
  );

  if (!mapData || isFetching) {
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
          handleActionButtonClick={handleActionButtonClick}
          setNextMovement={setNextMovement}
          setIsButtonHeld={setIsButtonHeld}
        />{" "}
      </div>

      <Player orientation={playerOrientation} />
      <CurrentMap
        position={position}
        objects={mapData.objects}
        occupants={mapData.occupants}
        height={mapData.height}
        width={mapData.width}
        overwrittenNpcs={overwrittenNpcs}
        rotatingNpcs={rotatingNpcs}
      />
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
