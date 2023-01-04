import { MapObject, MapObjectInstance } from "../Interfaces/Overworld";
import { generateId } from "./generateId";

export const generatePlaceholders = (
  mapObject: MapObject,
  x: number,
  y: number
) => {
  const id = generateId();
  const mapObjectInstance = {
    type: mapObject.type,
    id: id,
    position: { x: x, y: y },
  };
  let objectAndPlaceholders: MapObjectInstance[] = [mapObjectInstance];

  const lastY = y + mapObject.height;
  const lastX = x + mapObject.width;

  let yIndex = y;

  while (yIndex < lastY) {
    let xIndex = x;
    while (xIndex < lastX) {
      if (xIndex === x && yIndex === y) {
        xIndex++;
      } else {
        objectAndPlaceholders.push({
          type: 0,
          id: id,
          position: { x: xIndex, y: yIndex },
        });
        xIndex++;
      }
    }

    yIndex++;
  }
  console.log(objectAndPlaceholders);
  return objectAndPlaceholders;
};
