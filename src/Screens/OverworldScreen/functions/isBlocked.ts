import { EventLayer, Position } from "../../../Interfaces/Overworld";

export const isBlocked = (
  eventLayer: EventLayer,
  position: Position,
  collectedItems: number[]
): boolean => {
  const nextField = eventLayer[position.y][position.x];

  //avoid errors
  if (!nextField) {
    return true;
  }
  //unblocked fields
  if (nextField.type === "EMPTY") {
    return false;
  }
  if (nextField.type === "PORTAL") {
    return false;
  }
  if (
    nextField.type === "ITEM" &&
    collectedItems.find((item) => item === nextField.id)
  ) {
    return false;
  }

  return true;
};
