import { useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useCustomToast } from "../../../hooks/useCustomToast/useCustomToast";
import { useUpdateBag } from "../../../hooks/useUpdateBag/useUpdateBag";
import { Direction, OverworldPortal } from "../../../Interfaces/Overworld";
import { Player } from "../../../Interfaces/Player";
import {
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../../services/internal";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { tickSpeed } from "../OverworldScreen";
import { useOverwrittenNpcs } from "./useOverwrittenNpcs";
import { usePlayerOnMap } from "./usePlayerOnMap";

export const useOverworldScreen = () => {
  //externalData
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData, isFetching: isPlayerDataFetching } =
    useGetPlayerQuery(currentId);
  //States
  const [nextMovement, setNextMovement] = useState<Direction | undefined>(
    undefined
  );
  const [isButtonHeld, setIsButtonHeld] = useState<boolean>(false);
  const [isPortaling, setIsPortaling] = useState<boolean>(false);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  //Hooks
  const { notify } = useCustomToast();
  const { addItems } = useUpdateBag();
  const [updatePlayer] = useUpdatePlayerMutation();
  const {
    adjoiningField,
    position,
    setPosition,
    move,
    playerOrientation,
    collectedItems,
    mapId,
    isMapDataFetching,
    mapData,
  } = usePlayerOnMap();
  const { overwrittenNpcs, upsertOverwrittenNpc, rotateNpcs, rotatingNpcs } =
    useOverwrittenNpcs(mapData);
  //functions
  const handleActionButtonClick = useCallback(() => {
    const occupant = adjoiningField?.occupant;
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
        upsertOverwrittenNpc(occupant.id, playerOrientation);
        setParagraphs(occupant.dialogue);
      }
    }
    if (occupant?.onClick) {
      occupant.onClick();
    }
  }, [
    addItems,
    adjoiningField,
    collectedItems,
    mapData,
    mapId,
    updatePlayer,
    playerOrientation,
    playerData,
    position,
  ]);
  const handlePortalStep = useCallback(
    (playerData: Player, currentPortal: OverworldPortal) => {
      const splitLink = currentPortal.link.split("/");
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
    },
    [playerData, position, updatePlayer]
  );
  //Effects
  useEffect(() => {
    if (mapData?.name) {
      notify(<Pill>{mapData.name}</Pill>);
    }
  }, [mapData]);
  useEffect(() => {
    if (playerData) {
      setPosition(playerData.playerLocation.position);
    }
  }, [playerData]);

  useEffect(() => {
    if (playerData && mapData) {
      const currentPortal = mapData.occupants.find(
        (o) => o.occupantType === "PORTAL" && o.position === position
      ) as OverworldPortal;
      if (currentPortal) {
        handlePortalStep(playerData, currentPortal);
      }
    }
  }, [playerData, position, updatePlayer]);

  useEffect(() => {
    const movementInternal = setInterval(() => {
      if (nextMovement !== undefined) {
        move(nextMovement);
      }
      setNextMovement(isButtonHeld ? nextMovement : undefined);
    }, tickSpeed);
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
    setIsButtonHeld,
    setNextMovement,
    move,
    handleActionButtonClick,
    mapData,
    isFetching: isMapDataFetching || isPlayerDataFetching || isPortaling,
    paragraphs,
    setParagraphs,
    overwrittenNpcs,
    rotatingNpcs,
  };
};
