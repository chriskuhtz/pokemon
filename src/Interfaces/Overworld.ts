export interface MapField {
  texture: string;
  impassable?: boolean;
  occupant?: Occupant;
}

export interface BaseOccupant {
  id: number;
  occupantType: OccupantType;
  onClick?: () => void;
  onStep?: () => void;
}

export interface OverworldItem extends BaseOccupant {
  occupantType: "ITEM";
  item: string;
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
}

export type Occupant = OverworldPortal | OverworldItem | OverworldInhabitant;

export type OccupantType = "ITEM" | "PORTAL" | "INHABITANT";

export type OverWorldMap = { id: number; name: string; map: MapField[][] };

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
