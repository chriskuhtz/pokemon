import { MapObjectInstance, Occupant } from "../../../Interfaces/Overworld";
import { useLazyGetMapObjectQuery } from "../../../services/map";

export const useIsImpassable = () => {
  const [getMapObject] = useLazyGetMapObjectQuery();

  const isImpassable = async (
    collectedItems: number[],
    occupant?: Occupant,
    object?: MapObjectInstance
  ): Promise<boolean> => {
    if (occupant) {
      if (occupant.occupantType === "PORTAL") {
        return false;
      }
      if (
        occupant.occupantType === "ITEM" &&
        collectedItems.find((itemId) => itemId === occupant?.id)
      ) {
        //fields with a collected item are passable
        return false;
      }
      //occupied fields are impassable
      return true;
    }
    if (object) {
      const data = await getMapObject(object.type).unwrap();
      return data.impassable ?? false;
    }
    return false;
  };

  return { isImpassable };
};
