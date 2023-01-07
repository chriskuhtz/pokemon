import { ItemStack } from "./Bag";
import { PlayerLocation } from "./Player";

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

export interface OverworldInhabitant extends BaseOccupant {
  occupantType: "INHABITANT";
  inhabitantOrientation: MovementDirection;
  characterSprite: number;
  dialogue: string[];
  rotating?: boolean;
}

export type Occupant = OverworldItem | OverworldInhabitant;

export type OccupantType = "ITEM" | "PORTAL" | "INHABITANT";

export type EventLayerFieldType =
  | "EMPTY"
  | "BLOCKED"
  | "ITEM"
  | "PORTAL"
  | "NPC"
  | "LEDGE"
  | "ENCOUNTER";

export interface EventLayerBaseField {
  type: EventLayerFieldType;
  id?: number;
}
export interface EventLayerPortal extends EventLayerBaseField {
  to: PlayerLocation;
}
export interface EventLayerLedge extends EventLayerBaseField {
  direction: MovementDirection;
}
export type EventLayerField = EventLayerBaseField | EventLayerPortal;
export type EventLayer = EventLayerField[][];

export type OverWorldMap = {
  id: number;
  name: string;
  height: number;
  width: number;
  eventLayer: EventLayer;
  npcs: OverworldInhabitant[];
  items: OverworldItem[];
  encounters?: string[];
};

export type MovementDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
