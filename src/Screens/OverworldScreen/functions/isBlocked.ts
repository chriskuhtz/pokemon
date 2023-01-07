import { EventLayer, Position } from "../../../Interfaces/Overworld";

export const isBlocked = (
  eventLayer: EventLayer,
  position: Position,
  collectedItems: number[]
): boolean => {
  const nextPosition = eventLayer[position.y][position.x];

  //avoid errors
  if (!nextPosition) {
    return true;
  }
  //unblocked fields
  if (nextPosition.type === "EMPTY") {
    return false;
  }
  if (nextPosition.type === "PORTAL") {
    return false;
  }
  if (
    nextPosition.type === "ITEM" &&
    collectedItems.find((item) => item === nextPosition.id)
  ) {
    return false;
  }

  return true;
};
