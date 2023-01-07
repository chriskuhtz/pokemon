import { MovementDirection, Position } from "../../../Interfaces/Overworld";

export const getNewPosition = (
  { x, y }: Position,
  direction: MovementDirection
): Position => {
  if (direction === "UP") {
    return { y: y - 1, x: x };
  }
  if (direction === "RIGHT") {
    return { y: y, x: x + 1 };
  }
  if (direction === "LEFT") {
    return { y: y, x: x - 1 };
  }
  if (direction === "DOWN") {
    return { y: y + 1, x: x };
  }
  return { x: 0, y: 0 };
};
