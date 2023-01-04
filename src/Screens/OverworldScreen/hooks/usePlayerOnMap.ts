import { useCallback, useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { Direction, Occupant, Position } from "../../../Interfaces/Overworld";
import { OverworldMapProgress } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";

export const usePlayerOnMap = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData, isFetching: isPlayerDataFetching } =
    useGetPlayerQuery(currentId);
  const { data: mapData, isFetching: isMapDataFetching } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? -1
  );

  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [playerOrientation, setPlayerOrientation] = useState<Direction>(
    playerData?.playerLocation.playerOrientation ?? "DOWN"
  );
  const { collectedItems, mapId }: OverworldMapProgress = useMemo(
    () =>
      playerData?.overworldProgress.find(
        (mapProgress) => mapProgress.mapId === mapData?.id
      ) ?? { collectedItems: [], mapId: mapData?.id ?? -1 },
    [playerData, mapData]
  );

  const adjoiningField:
    | { position: Position; occupant?: Occupant }
    | undefined = useMemo(() => {
    if (!mapData) {
      return undefined;
    }
    let newPosition = { y: position.y + 1, x: position.x };

    const findOccupant = (position: Position) => {
      return mapData?.occupants.find(
        (o) => o.position.x === position.x && o.position.y === position.y
      );
    };

    if (playerOrientation === "UP" && position.y - 1 > -1) {
      newPosition = { y: position.y - 1, x: position.x };
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
      };
    }
    if (playerOrientation === "LEFT" && position.x - 1 > -1) {
      newPosition = { y: position.y, x: position.x - 1 };
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
      };
    }
    if (playerOrientation === "RIGHT" && position.x + 1 < mapData.width) {
      newPosition = { y: position.y, x: position.x + 1 };
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
      };
    }
    if (playerOrientation === "DOWN" && position.y + 1 < mapData.height) {
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
      };
    }
  }, [position, playerOrientation, mapData]);
  const isImpassable = useCallback(
    (occupant?: Occupant): boolean => {
      if (!occupant) {
        return false;
      }
      if (occupant.occupantType === "PORTAL") {
        return false;
      }
      if (
        occupant.occupantType === "ITEM" &&
        collectedItems.find((itemId) => itemId === occupant?.id)
      ) {
        //fields with a collected item are passable
        return false;
      }
      //occupied fields are impassable
      return true;
    },
    [collectedItems]
  );

  const move = useCallback(
    (direction: Direction) => {
      if (playerOrientation !== direction) {
        setPlayerOrientation(direction);
        return;
      }
      if (adjoiningField) {
        if (!isImpassable(adjoiningField.occupant))
          setPosition(adjoiningField.position);
      }
    },
    [
      setPosition,
      playerOrientation,
      setPlayerOrientation,
      adjoiningField,
      isImpassable,
    ]
  );

  return {
    adjoiningField,
    position,
    setPosition,
    move,
    playerOrientation,
    mapData,
    isPlayerDataFetching,
    isMapDataFetching,
    collectedItems,
    mapId,
  };
};
