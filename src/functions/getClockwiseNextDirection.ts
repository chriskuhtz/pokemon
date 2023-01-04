import { Direction } from "../Interfaces/Overworld";

export const getClockwiseNextDirection = (direction: Direction): Direction => {
  if (direction === "DOWN") return "LEFT";
  if (direction === "LEFT") return "UP";
  if (direction === "UP") return "RIGHT";
  return "DOWN";
};
