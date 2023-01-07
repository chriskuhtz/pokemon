import { useEffect, useMemo, useState } from "react";
import { getCollectedItems } from "../../../functions/getCollectedItems";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useCustomToast } from "../../../hooks/useCustomToast/useCustomToast";
import { MovementDirection, Position } from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { useMovementInterval } from "./useMovementInterval";

export const usePlayerMovement = (
  playerLocation: PlayerLocation,
  nextPosition: Position,
  updatePlayerLocation: (x: PlayerLocation) => void
) => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? 0
  );
  const { notify } = useCustomToast();

  //movementStates
  const [movementDirection, setMovementDirection] = useState<
    MovementDirection | undefined
  >(undefined);
  const [isButtonHeld, setIsButtonHeld] = useState<boolean>(false);

  const movementInterval = useMovementInterval(
    updatePlayerLocation,
    setMovementDirection,
    isButtonHeld,
    playerLocation,
    nextPosition,
    playerData ? getCollectedItems(playerData) : [],
    mapData,
    movementDirection
  );

  //Location Toast
  useEffect(() => {
    if (mapData?.name) {
      notify(<Pill>{mapData.name}</Pill>);
    }
  }, [mapData]);

  return {
    movementDirection,
    setMovementDirection,
    isButtonHeld,
    setIsButtonHeld,
  };
};
