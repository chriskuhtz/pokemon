import { MovementDirection } from "../Interfaces/Overworld";

export const getClockwiseNextDirection = (
  direction: MovementDirection
): MovementDirection => {
  if (direction === "DOWN") return "LEFT";
  if (direction === "LEFT") return "UP";
  if (direction === "UP") return "RIGHT";
  return "DOWN";
};
