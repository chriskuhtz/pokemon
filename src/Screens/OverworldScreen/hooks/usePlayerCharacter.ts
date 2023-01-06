import { useEffect, useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { Direction, Position } from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";

export const usePlayerCharacter = () => {
  //externalData
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData, isFetching: isPlayerDataFetching } =
    useGetPlayerQuery(currentId);
  //Playerstates
  const [x, setX] = useState<number>(7);
  const [y, setY] = useState<number>(4);
  const [orientation, setOrientation] = useState<Direction>("DOWN");
  const nextField: Position = useMemo(() => {
    if (orientation === "UP") {
      return { y: y - 1, x: x };
    }
    if (orientation === "RIGHT") {
      return { y: y, x: x + 1 };
    }
    if (orientation === "LEFT") {
      return { y: y, x: x - 1 };
    }
    return { y: y + 1, x: x };
  }, [x, y, orientation]);

  const updatePlayerLocation = (newLocation: PlayerLocation) => {
    setX(newLocation.position.x);
    setY(newLocation.position.y);
    setOrientation(newLocation.playerOrientation);
  };

  //effects
  useEffect(() => {
    if (playerData) {
      updatePlayerLocation(playerData.playerLocation);
    }
  }, [playerData]);

  return {
    playerData,
    isPlayerDataFetching,
    playerLocation: {
      mapId: 0,
      position: { x: x, y: y },
      playerOrientation: orientation,
    },
    updatePlayerLocation,
    nextField,
  };
};
