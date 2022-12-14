import { useEffect, useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { MovementDirection, Position } from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { getNewPosition } from "../functions/getNewPosition";

export const usePlayerPosition = () => {
  //externalData
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData, isFetching: isPlayerDataFetching } =
    useGetPlayerQuery(currentId);
  //Playerstates
  const [x, setX] = useState<number>(7);
  const [y, setY] = useState<number>(4);
  const [orientation, setOrientation] = useState<MovementDirection>("DOWN");
  const [mapId, setMapId] = useState<number>(-1);
  const nextPosition: Position = useMemo(() => {
    return getNewPosition({ x: x, y: y }, orientation) ?? { x: x, y: y };
  }, [x, y, orientation]);

  const updatePlayerLocation = (newLocation: PlayerLocation) => {
    setX(newLocation.position.x);
    setY(newLocation.position.y);
    setOrientation(newLocation.playerOrientation);
    setMapId(newLocation.mapId);
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
      mapId: mapId,
      position: { x: x, y: y },
      playerOrientation: orientation,
    },
    updatePlayerLocation,
    nextPosition,
  };
};
