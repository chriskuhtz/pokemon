import { useMultiTextBox } from "../../hooks/useMultiTextBox/useMultiTextBox";
import { useGetMapQuery } from "../../services/map";
import { absolutePosition } from "../../UiComponents/GlobalStyles/globalStyles";
import { Pill } from "../../UiComponents/Pill/Pill";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";
import { HelperGrid } from "./components/HelperGrid/HelperGrid";
import { MenuButton } from "./components/MenuButton/MenuButton";
import { MovementAndActionButtons } from "./components/MovementAndActionButtons/MovementAndActionButtons";
import { MemoizedOverworldInhabitant } from "./components/OverworldInhabitant/OverworldInhabitant";
import { MemoizedOverworldItem } from "./components/OverworldItem/OverworldItem";
import { PlayerCharacter } from "./components/PlayerCharacter/PlayerCharacter";
import { useActionButtonClick } from "./hooks/useActionButtonClick";
import { useOverwrittenNpcs } from "./hooks/useOverwrittenNpcs";
import { usePlayerCharacter } from "./hooks/usePlayerCharacter";
import { usePlayerMovement } from "./hooks/usePlayerMovement";

export const size = Math.min(
  Math.floor(window.innerWidth / 15),
  Math.floor(window.innerHeight / 9)
);
export const tickSpeed = 100;

const viewPortStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
  position: absolutePosition,
  top: 0,
  left: 0,
};
const backgroundStyle = {
  backgroundColor: "black",
  width: "100%",
  height: "100%",
};
const backgroundLayerStyle = (x: number, y: number) => {
  return {
    position: absolutePosition,
    top: (-y + 4) * size,
    left: (-x + 7) * size,
  };
};

export const OverWorldScreen = (): JSX.Element => {
  const { data: mapData } = useGetMapQuery(0);
  //hooks
  const { playerLocation, updatePlayerLocation, nextField } =
    usePlayerCharacter();
  const { setMovementDirection, setIsButtonHeld } = usePlayerMovement(
    playerLocation,
    nextField,
    updatePlayerLocation
  );
  const { overwrittenNpcs, upsertOverwrittenNpc } = useOverwrittenNpcs();
  const { handleActionButtonClick, paragraphs, setParagraphs, displayTextBox } =
    useActionButtonClick(upsertOverwrittenNpc);
  const { index, handleClick: nextParagraph } = useMultiTextBox(
    paragraphs,
    () => setParagraphs([])
  );

  if (!overwrittenNpcs || !mapData) {
    return <ErrorScreen />;
  }
  return (
    <div style={viewPortStyle} id={"viewport"}>
      {!displayTextBox && (
        <>
          <MenuButton playerLocation={playerLocation} />
          <MovementAndActionButtons
            handleActionButtonClick={() => {
              handleActionButtonClick(playerLocation, nextField);
            }}
            setMovementDirection={setMovementDirection}
            setIsButtonHeld={setIsButtonHeld}
          />
        </>
      )}

      <PlayerCharacter
        orientation={playerLocation.playerOrientation}
        y={playerLocation.position.y}
      />
      <div style={backgroundStyle} />
      <div
        style={backgroundLayerStyle(
          playerLocation.position.x,
          playerLocation.position.y
        )}
      >
        <img
          alt="palletTown"
          src="assets/maps/PalletTown.png"
          height={size * 22}
          width={size * 24}
        />
        {mapData.items.map((item) => (
          <MemoizedOverworldItem item={item} key={item.id} />
        ))}
        {overwrittenNpcs.map((npc) => (
          <MemoizedOverworldInhabitant inhabitant={npc} key={npc.id} />
        ))}
        <HelperGrid />
      </div>
      <div
        style={{
          position: absolutePosition,
          bottom: "0",
          width: "calc(100% - 2rem)",
          padding: "1rem",
          zIndex: 1000,
          display: displayTextBox ? "block" : "none",
        }}
      >
        {" "}
        <Pill onClick={nextParagraph}>{paragraphs[index]}</Pill>
      </div>
    </div>
  );
};
