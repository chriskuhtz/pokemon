import { ItemStack } from "./Bag";

export interface BaseOccupant {
  id: number;
  occupantType: OccupantType;
  onClick?: () => void;
  onStep?: () => void;
  position: Position;
}
export interface OverworldItem extends BaseOccupant {
  occupantType: "ITEM";
  item: ItemStack;
}
export interface OverworldPortal extends BaseOccupant {
  occupantType: "PORTAL";
  link: string;
}
export interface OverworldInhabitant extends BaseOccupant {
  occupantType: "INHABITANT";
  inhabitantOrientation: Direction;
  characterSprite: number;
  dialogue: string[];
  rotating?: boolean;
}

export type Occupant = OverworldPortal | OverworldItem | OverworldInhabitant;

export type OccupantType = "ITEM" | "PORTAL" | "INHABITANT";

export interface MapObject {
  type: number;
  height: number;
  width: number;
  name: string;
  impassable?: boolean;
}
export interface MapObjectInstance {
  type: number;
  id: number;
  position: Position;
}
export type OverWorldMap = {
  id: number;
  name: string;
  occupants: Occupant[];
  objects: MapObjectInstance[];
  height: number;
  width: number;
};

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
