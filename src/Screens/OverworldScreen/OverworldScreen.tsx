import { useMemo } from "react";
import { getCurrentPlayerId } from "../../functions/handleCurrentPlayerId";
import { useGetPlayerQuery } from "../../services/internal";
import { useGetMapQuery } from "../../services/map";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";
import { OverworldDialogue } from "./components/Dialogue/OverworldDialogue";
import { MemoizedHelperGrid } from "./components/HelperGrid/HelperGrid";
import { MenuButton } from "./components/MenuButton/MenuButton";
import { MovementAndActionButtons } from "./components/MovementAndActionButtons/MovementAndActionButtons";
import { MemoizedOverworldInhabitant } from "./components/OverworldInhabitant/OverworldInhabitant";
import { MemoizedOverworldItem } from "./components/OverworldItem/OverworldItem";
import { PlayerCharacter } from "./components/PlayerCharacter/PlayerCharacter";
import { useActionButtonClick } from "./hooks/useActionButtonClick";
import { useOverwrittenNpcs } from "./hooks/useOverwrittenNpcs";
import { usePlayerMovement } from "./hooks/usePlayerMovement";
import { usePlayerPosition } from "./hooks/usePlayerPosition";
import {
  backgroundLayerStyle,
  backgroundStyle,
  viewPortStyle,
} from "./overworldStyle";

export const size = Math.min(
  Math.floor(window.innerWidth / 15),
  Math.floor(window.innerHeight / 9)
);
export const tickSpeed = 100;

export const OverWorldScreen = (): JSX.Element => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? -1
  );
  //hooks
  const { playerLocation, updatePlayerLocation, nextPosition } =
    usePlayerPosition();
  const { setMovementDirection, setIsButtonHeld } = usePlayerMovement(
    playerLocation,
    nextPosition,
    updatePlayerLocation
  );
  const { overwrittenNpcs, upsertOverwrittenNpc } = useOverwrittenNpcs();
  const { handleActionButtonClick, paragraphs, setParagraphs, displayTextBox } =
    useActionButtonClick(upsertOverwrittenNpc);

  if (!overwrittenNpcs || !mapData || !playerData) {
    return <ErrorScreen />;
  }
  return (
    <div style={viewPortStyle} id={"viewport"}>
      {!displayTextBox && (
        <>
          <MenuButton playerLocation={playerLocation} />
          <MovementAndActionButtons
            handleActionButtonClick={() => {
              handleActionButtonClick(playerLocation, nextPosition);
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
          alt="backgroundImage"
          src={`assets/maps/${mapData.id}.png`}
          height={size * mapData.height}
          width={size * mapData.width}
        />
        {mapData.items.map((item) => (
          <MemoizedOverworldItem item={item} key={item.id} />
        ))}
        {overwrittenNpcs.map((npc) => (
          <MemoizedOverworldInhabitant inhabitant={npc} key={npc.id} />
        ))}
        <MemoizedHelperGrid />
      </div>
      {displayTextBox && (
        <OverworldDialogue
          paragraphs={paragraphs}
          setParagraphs={setParagraphs}
        />
      )}
    </div>
  );
};
