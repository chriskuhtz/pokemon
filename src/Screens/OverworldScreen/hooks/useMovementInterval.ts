import { useEffect } from "react";
import {
  EventLayerPortal,
  MovementDirection,
  OverWorldMap,
  Position,
} from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { getField } from "../functions/getField";
import { isBlocked } from "../functions/isBlocked";
import { tickSpeed } from "../OverworldScreen";
import { useMovementOptions } from "./useMovementOptions";

export const useMovementInterval = (
  updatePlayerLocation: (x: PlayerLocation) => void,
  setMovementDirection: (x: MovementDirection | undefined) => void,
  isButtonHeld: boolean,
  playerLocation: PlayerLocation,
  nextPosition: Position,
  collectedItems: number[],
  mapData?: OverWorldMap,
  movementDirection?: MovementDirection
) => {
  const { move, changeDirection, portal, jumpLedge } = useMovementOptions(
    updatePlayerLocation,
    setMovementDirection,
    isButtonHeld,
    playerLocation,
    movementDirection
  );

  const handleEncounter = (encounters?: string[]) => {
    if (!encounters) {
      return;
    }
    const random = Math.floor(Math.random() * encounters.length);
    console.log(encounters[random]);
  };
  //movement effect
  useEffect(() => {
    const movementInternal = setInterval(() => {
      //check necessary parameters
      if (!mapData || !movementDirection) {
        return;
      }

      //spin
      if (movementDirection !== playerLocation.playerOrientation) {
        changeDirection(movementDirection);
        return;
      }
      const blocked = isBlocked(
        mapData.eventLayer,
        nextPosition,
        movementDirection,
        collectedItems
      );
      const nextField = getField(mapData.eventLayer, nextPosition);
      //use Portal
      if (blocked === false && nextField?.type === "PORTAL") {
        portal(nextField as EventLayerPortal);
        return;
      }
      //jumpLedge
      if (blocked === false && nextField?.type === "LEDGE") {
        jumpLedge(nextPosition, movementDirection);
        return;
      }
      //check for encounter
      if (blocked === false && nextField?.type === "ENCOUNTER") {
        handleEncounter(mapData.encounters);
      }
      //move
      if (blocked === false) {
        move(nextPosition, movementDirection);
        return;
      }
    }, tickSpeed);
    return () => {
      clearInterval(movementInternal);
    };
  }, [
    movementDirection,
    playerLocation,
    mapData,
    changeDirection,
    collectedItems,
    jumpLedge,
    move,
    nextPosition,
    portal,
  ]);
};
