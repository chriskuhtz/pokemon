import { useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useUpdateBag } from "../../../hooks/useUpdateBag/useUpdateBag";
import { Direction, MapField, Position } from "../../../Interfaces/Overworld";
import { OverworldMapProgress } from "../../../Interfaces/Player";
import {
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";

const fallbackmap = [
  [
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
  ],
  [
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
    { texture: "field" },
  ],
];

export const useOverworldScreen = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData, isFetching: isPlayerDataFetching } =
    useGetPlayerQuery(currentId);
  const { data: mapData, isFetching: isMapDataFetching } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? -1
  );
  const { addItems } = useUpdateBag();
  const { collectedItems, mapId }: OverworldMapProgress = useMemo(
    () =>
      playerData?.overworldProgress.find(
        (mapProgress) => mapProgress.mapId === mapData?.id
      ) ?? { collectedItems: [], mapId: mapData?.id ?? -1 },
    [playerData, mapData]
  );
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const [updatePlayer] = useUpdatePlayerMutation();

  const map = useMemo(() => mapData?.map ?? fallbackmap, [mapData]);

  // top left = 0/0
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (playerData) {
      setPosition(playerData.playerLocation.position);
    }
  }, [playerData]);
  const [playerOrientation, setPlayerOrientation] = useState<Direction>(
    playerData?.playerLocation.playerOrientation ?? "DOWN"
  );
  const adjoiningField: { position: Position; field: MapField } | undefined =
    useMemo(() => {
      if (map) {
        if (playerOrientation === "UP" && position.y - 1 > -1) {
          return {
            position: { y: position.y - 1, x: position.x },
            field: map[position.y - 1][position.x],
          };
        }
        if (playerOrientation === "LEFT" && position.x - 1 > -1) {
          return {
            position: { y: position.y, x: position.x - 1 },
            field: map[position.y][position.x - 1],
          };
        }
        if (
          playerOrientation === "RIGHT" &&
          position.x + 1 < map[position.y].length
        ) {
          return {
            position: { y: position.y, x: position.x + 1 },
            field: map[position.y][position.x + 1],
          };
        }
        if (playerOrientation === "DOWN" && position.y + 1 < map.length) {
          return {
            position: { y: position.y + 1, x: position.x },
            field: map[position.y + 1][position.x],
          };
        }
      } else return undefined;
    }, [position, playerOrientation, map]);

  const [nextMovement, setNextMovement] = useState<Direction | undefined>(
    undefined
  );

  const [isButtonHeld, setIsButtonHeld] = useState<boolean>(false);
  const [isPortaling, setIsPortaling] = useState<boolean>(false);

  const isImpassable = useCallback(
    (field: MapField): boolean => {
      if (field.occupant) {
        if (field.occupant.occupantType === "PORTAL") {
          return false;
        }
        if (
          field.occupant.occupantType === "ITEM" &&
          collectedItems.find((itemId) => itemId === field.occupant?.id)
        ) {
          //fields with a collected item are passable
          return false;
        }
        //occupied fields are impassable
        return true;
      }
      //impassable fields are impassable
      return field.impassable ?? false;
    },
    [collectedItems]
  );

  const move = useCallback(
    (direction: Direction) => {
      if (playerOrientation !== direction) {
        setPlayerOrientation(direction);
        return;
      }
      if (adjoiningField?.field && !isImpassable(adjoiningField.field)) {
        setPosition(adjoiningField.position);
        if (adjoiningField?.field?.occupant?.onStep) {
          adjoiningField.field.occupant.onStep();
        }
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

  const handleActionButtonClick = useCallback(() => {
    const occupant = adjoiningField?.field?.occupant;
    if (playerData && mapData) {
      if (
        occupant?.occupantType === "ITEM" &&
        !collectedItems.find(
          (itemId) => itemId === occupant?.id && mapId !== -1
        )
      ) {
        const updatedMapProgress = {
          mapId: mapId,
          collectedItems: [...collectedItems].concat(occupant.id),
        };
        const indexToUpdate = playerData?.overworldProgress.findIndex(
          (progress) => progress.mapId === mapId
        );
        const updatedOverworldProgress = [...playerData.overworldProgress];
        if (indexToUpdate === -1) {
          updatedOverworldProgress.push(updatedMapProgress);
        } else
          updatedOverworldProgress.splice(indexToUpdate, 1, updatedMapProgress);

        addItems([occupant.item]);
        updatePlayer({
          ...playerData,
          playerLocation: { mapId: mapId, position, playerOrientation },
          overworldProgress: [...updatedOverworldProgress],
        });
      }
      if (occupant?.occupantType === "INHABITANT") {
        setParagraphs(occupant.dialogue);
      }
    }
    if (occupant?.onClick) {
      occupant.onClick();
    }
  }, [
    adjoiningField,
    collectedItems,
    mapData,
    mapId,
    updatePlayer,
    playerOrientation,
    playerData,
    position,
  ]);

  useEffect(() => {
    const currentField: MapField = map[position.y][position.x];
    if (playerData && currentField?.occupant?.occupantType === "PORTAL") {
      const splitLink = currentField.occupant.link.split("/");
      const newMapId: number = parseInt(splitLink[0]);
      const newY: number = parseInt(splitLink[1]);
      const newX: number = parseInt(splitLink[2]);

      setPosition({ y: 0, x: 0 });
      setNextMovement(undefined);
      setIsButtonHeld(false);
      setIsPortaling(true);
      setTimeout(() => {
        updatePlayer({
          ...playerData,
          playerLocation: {
            mapId: newMapId,
            playerOrientation: "DOWN",
            position: { y: newY, x: newX },
          },
        });
        setIsPortaling(false);
      }, 250);
    }
  }, [playerData, map, position, updatePlayer]);

  useEffect(() => {
    const movementInternal = setInterval(() => {
      if (nextMovement !== undefined) {
        move(nextMovement);
      }

      setNextMovement(isButtonHeld ? nextMovement : undefined);
    }, 100);
    return () => {
      clearInterval(movementInternal);
    };
  }, [nextMovement, setNextMovement, position, isButtonHeld, move]);

  return {
    position,
    playerOrientation,
    adjoiningField,
    nextMovement,
    isButtonHeld,
    setPosition,
    setPlayerOrientation,
    setIsButtonHeld,
    setNextMovement,
    move,
    handleActionButtonClick,
    mapData: mapData ?? { map: fallbackmap, id: 0, name: "fallbackmap" },
    isFetching: isMapDataFetching || isPlayerDataFetching || isPortaling,
    paragraphs,
    setParagraphs,
  };
};
