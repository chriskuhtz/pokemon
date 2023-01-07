import {
  EventLayer,
  EventLayerLedge,
  MovementDirection,
  Position,
} from "../../../Interfaces/Overworld";

export const isBlocked = (
  eventLayer: EventLayer,
  position: Position,
  movementDirection: MovementDirection,
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
  if (nextField.type === "ENCOUNTER") {
    return false;
  }
  if (
    nextField.type === "ITEM" &&
    collectedItems.find((item) => item === nextField.id)
  ) {
    return false;
  }
  if (nextField.type === "LEDGE") {
    const ledge = nextField as EventLayerLedge;
    if (ledge.direction === movementDirection) {
      return false;
    }
  }

  return true;
};
