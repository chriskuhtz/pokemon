import { useEffect, useMemo, useState } from "react";
import { getCollectedItems } from "../../../functions/getCollectedItems";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useCustomToast } from "../../../hooks/useCustomToast/useCustomToast";
import { useUpdatePlayerAttribute } from "../../../hooks/useUpdatePlayerAttribute/useUpdatePlayerAttribute";
import {
  Direction,
  EventLayerPortal,
  Position,
} from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { getField } from "../functions/getField";
import { isBlocked } from "../functions/isBlocked";
import { tickSpeed } from "../OverworldScreen";

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
  const { updatePlayerAttribute } = useUpdatePlayerAttribute();
  //movementStates
  const [movementDirection, setMovementDirection] = useState<
    Direction | undefined
  >(undefined);
  const [isButtonHeld, setIsButtonHeld] = useState<boolean>(false);

  const changeDirection = (newOrientation: Direction) => {
    updatePlayerLocation({
      ...playerLocation,
      playerOrientation: newOrientation,
    });
  };
  const move = (newPosition: Position, newOrientation: Direction) => {
    updatePlayerLocation({
      ...playerLocation,
      position: newPosition,
      playerOrientation: newOrientation,
    });
  };
  const portal = (portal: EventLayerPortal) => {
    updatePlayerAttribute({ playerLocation: portal.to });
  };

  //movement effect
  useEffect(() => {
    const movementInternal = setInterval(() => {
      if (!playerData || !mapData || !movementDirection) {
        return;
      }

      //spin
      if (movementDirection !== playerLocation.playerOrientation) {
        changeDirection(movementDirection);
        setMovementDirection(isButtonHeld ? movementDirection : undefined);
        return;
      }
      const blocked = isBlocked(
        mapData.eventLayer,
        nextPosition,
        getCollectedItems(playerData)
      );
      const nextField = getField(mapData.eventLayer, nextPosition);
      //use Portal
      if (blocked === false && nextField?.type === "PORTAL") {
        portal(nextField as EventLayerPortal);
        setMovementDirection(isButtonHeld ? movementDirection : undefined);
        return;
      }
      //move
      if (blocked === false) {
        move(nextPosition, movementDirection);
        setMovementDirection(isButtonHeld ? movementDirection : undefined);
        return;
      }
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
