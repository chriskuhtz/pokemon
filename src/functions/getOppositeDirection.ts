import { Direction } from "../Interfaces/Overworld";

export const getOppositeDirection = (direction: Direction): Direction => {
  if (direction === "DOWN") return "UP";
  if (direction === "LEFT") return "RIGHT";
  if (direction === "RIGHT") return "LEFT";
  return "DOWN";
};
