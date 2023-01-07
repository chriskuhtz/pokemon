import { useEffect, useMemo, useState } from "react";
import { getOppositeDirection } from "../../../functions/getOppositeDirection";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { Direction, OverworldInhabitant } from "../../../Interfaces/Overworld";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";

export const useOverwrittenNpcs = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? 0
  );
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
