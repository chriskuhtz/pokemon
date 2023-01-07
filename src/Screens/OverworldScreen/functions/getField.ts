import {
  EventLayer,
  EventLayerField,
  Position,
} from "../../../Interfaces/Overworld";

export const getField = (
  eventLayer: EventLayer,
  position: Position
): EventLayerField | undefined => {
  const nextField = eventLayer[position.y][position.x];
  if (nextField) {
    return nextField;
  }
};
