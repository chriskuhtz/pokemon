import { useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useUpdateBag } from "../../../hooks/useUpdateBag/useUpdateBag";
import { useUpdatePlayerAttribute } from "../../../hooks/useUpdatePlayerAttribute/useUpdatePlayerAttribute";
import {
  MovementDirection,
  OverworldInhabitant,
  OverworldItem,
  Position,
} from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";

export const useActionButtonClick = (
  upsertOverwrittenNpc: (
    inhabitant: OverworldInhabitant,
    approachDirection: MovementDirection
  ) => void
) => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? -1
  );
  const { addItems } = useUpdateBag();
  const { updatePlayerAttribute } = useUpdatePlayerAttribute();

  //states
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const findItem = (
    overworldItem: OverworldItem,
    playerLocation: PlayerLocation
  ) => {
    const { item, id } = overworldItem;
    addItems([item]);
    updatePlayerAttribute({
      playerLocation: playerLocation,
      collectedItem: id,
    });
  };
  const handleActionButtonClick = (
    playerLocation: PlayerLocation,
    nextPosition: Position
  ) => {
    if (!mapData) {
      return;
    }
    const clickedField = mapData.eventLayer[nextPosition.y][nextPosition.x];

    if (clickedField?.type === "ITEM") {
      const item = mapData.items.find((item) => item.id === clickedField.id);
      if (!item) {
        return;
      }
      findItem(item, playerLocation);
    }
    if (clickedField?.type === "NPC") {
      const npc = mapData.npcs.find((npc) => npc.id === clickedField.id);
      if (!npc) {
        return;
      }
      upsertOverwrittenNpc(npc, playerLocation.playerOrientation);
      setParagraphs(npc.dialogue);
    }
  };

  return {
    handleActionButtonClick,
    paragraphs,
    setParagraphs,
    displayTextBox: paragraphs.length > 0,
  };
};
