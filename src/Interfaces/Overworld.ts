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

export type EventLayerFieldType =
  | "EMPTY"
  | "BLOCKED"
  | "ITEM"
  | "PORTAL"
  | "NPC";
export interface EventLayerField {
  type: EventLayerFieldType;
  id?: number;
}
export type EventLayer = EventLayerField[][];

export type OverWorldMap = {
  id: number;
  name: string;
  eventLayer: EventLayer;
  npcs: OverworldInhabitant[];
  items: OverworldItem[];
};

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
