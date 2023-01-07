import { MovementDirection } from "../Interfaces/Overworld";

export const getOppositeDirection = (
  direction: MovementDirection
): MovementDirection => {
  if (direction === "DOWN") return "UP";
  if (direction === "LEFT") return "RIGHT";
  if (direction === "RIGHT") return "LEFT";
  return "DOWN";
};
