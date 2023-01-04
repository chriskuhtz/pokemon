import { useCallback, useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import {
  Direction,
  MapObjectInstance,
  Occupant,
  Position,
} from "../../../Interfaces/Overworld";
import { OverworldMapProgress } from "../../../Interfaces/Player";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";
import { useIsImpassable } from "./useIsImpassable";

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
  const { isImpassable } = useIsImpassable();

  const adjoiningField:
    | { position: Position; occupant?: Occupant; object?: MapObjectInstance }
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
    const findObject = (position: Position) => {
      return mapData?.objects.find(
        (o) => o.position.x === position.x && o.position.y === position.y
      );
    };

    if (playerOrientation === "UP" && position.y - 1 > -1) {
      newPosition = { y: position.y - 1, x: position.x };
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
        object: findObject(newPosition),
      };
    }
    if (playerOrientation === "LEFT" && position.x - 1 > -1) {
      newPosition = { y: position.y, x: position.x - 1 };
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
        object: findObject(newPosition),
      };
    }
    if (playerOrientation === "RIGHT" && position.x + 1 < mapData.width) {
      newPosition = { y: position.y, x: position.x + 1 };
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
        object: findObject(newPosition),
      };
    }
    if (playerOrientation === "DOWN" && position.y + 1 < mapData.height) {
      return {
        position: newPosition,
        occupant: findOccupant(newPosition),
        object: findObject(newPosition),
      };
    }
    return undefined;
  }, [position, playerOrientation, mapData]);

  const move = useCallback(
    async (direction: Direction) => {
      if (playerOrientation !== direction) {
        setPlayerOrientation(direction);
        return;
      }
      if (adjoiningField) {
        const impassable = await isImpassable(
          collectedItems,
          adjoiningField.occupant,
          adjoiningField.object
        );
        if (!impassable) setPosition(adjoiningField.position);
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
