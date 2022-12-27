import { Direction, Position } from "./Overworld";

export interface Player {
  id: number;
  name: string;
  character: number;
  money: number;
  playerLocation: PlayerLocation;
  overworldProgress: OverworldMapProgress[];
}

export interface PlayerLocation {
  mapId: number;
  playerOrientation: Direction;
  position: Position;
}

export interface OverworldMapProgress {
  mapId: number;
  collectedItems: number[];
}
