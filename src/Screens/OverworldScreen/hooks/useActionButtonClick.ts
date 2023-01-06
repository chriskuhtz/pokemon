import { useState } from "react";
import { useUpdateBag } from "../../../hooks/useUpdateBag/useUpdateBag";
import { useUpdatePlayerAttribute } from "../../../hooks/useUpdatePlayerAttribute/useUpdatePlayerAttribute";
import {
  Direction,
  OverworldInhabitant,
  OverworldItem,
  Position,
} from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetMapQuery } from "../../../services/map";

export const useActionButtonClick = (
  upsertOverwrittenNpc: (
    inhabitant: OverworldInhabitant,
    approachDirection: Direction
  ) => void
) => {
  const mapId = 0;
  const { data: mapData } = useGetMapQuery(mapId);
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
    nextField: Position
  ) => {
    if (!mapData) {
      return;
    }
    const clickedField = mapData.eventLayer[nextField.y][nextField.x];

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
