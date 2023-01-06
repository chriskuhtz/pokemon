import { useEffect, useState } from "react";
import { getOppositeDirection } from "../../../functions/getOppositeDirection";
import { Direction, OverworldInhabitant } from "../../../Interfaces/Overworld";
import { useGetMapQuery } from "../../../services/map";

export const useOverwrittenNpcs = () => {
  const mapId = 0;
  const { data: mapData } = useGetMapQuery(mapId);
  const [overwrittenNpcs, setOverwrittenNpcs] = useState<OverworldInhabitant[]>(
    []
  );

  const upsertOverwrittenNpc = (
    inhabitant: OverworldInhabitant,
    approachDirection: Direction
  ) => {
    const newDirection = getOppositeDirection(approachDirection);
    const newNpc = {
      ...inhabitant,
      inhabitantOrientation: newDirection,
      rotating: false,
    };

    const index = overwrittenNpcs.findIndex((npc) => npc.id === newNpc.id);
    const newOverwrittenNpcs = overwrittenNpcs.concat(newNpc);
    if (index !== -1) {
      newOverwrittenNpcs.splice(index, 1);
    }

    setOverwrittenNpcs(newOverwrittenNpcs);
  };

  useEffect(() => {
    if (mapData) {
      setOverwrittenNpcs(mapData.npcs);
    }
  }, [mapData]);

  return { overwrittenNpcs, upsertOverwrittenNpc };
};
