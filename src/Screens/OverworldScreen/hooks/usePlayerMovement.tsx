import { useEffect, useMemo, useState } from "react";
import { getCollectedItems } from "../../../functions/getCollectedItems";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useCustomToast } from "../../../hooks/useCustomToast/useCustomToast";
import { Direction, Position } from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { isBlocked } from "../functions/isBlocked";
import { tickSpeed } from "../OverworldScreen";

export const usePlayerMovement = (
  playerLocation: PlayerLocation,
  nextField: Position,
  updatePlayerLocation: (x: PlayerLocation) => void
) => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(0);
  const { notify } = useCustomToast();
  //movementStates
  const [movementDirection, setMovementDirection] = useState<
    Direction | undefined
  >(undefined);
  const [isButtonHeld, setIsButtonHeld] = useState<boolean>(false);

  //movement effect
  useEffect(() => {
    const movementInternal = setInterval(() => {
      if (
        playerData &&
        mapData?.eventLayer &&
        movementDirection !== undefined
      ) {
        if (movementDirection !== playerLocation.playerOrientation) {
          updatePlayerLocation({
            ...playerLocation,
            playerOrientation: movementDirection,
          });
        } else if (
          !isBlocked(
            mapData.eventLayer,
            nextField,
            getCollectedItems(playerData)
          )
        ) {
          updatePlayerLocation({
            ...playerLocation,
            position: nextField,
            playerOrientation: movementDirection,
          });
        }
      }
      setMovementDirection(isButtonHeld ? movementDirection : undefined);
    }, tickSpeed);
    return () => {
      clearInterval(movementInternal);
    };
  }, [
    movementDirection,
    setMovementDirection,
    playerLocation,
    isButtonHeld,
    mapData,
    updatePlayerLocation,
  ]);

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
