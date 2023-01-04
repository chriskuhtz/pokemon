import { memo } from "react";
import { MapObjectInstance } from "../../../../Interfaces/Overworld";
import { MemoizedMapObject } from "../MapObject/MapObject";

const Objects = ({
  objects,
}: {
  objects: MapObjectInstance[];
}): JSX.Element => {
  return (
    <div>
      {" "}
      {objects.map((o, i) => (
        <MemoizedMapObject object={o} key={o.id + i} />
      ))}
    </div>
  );
};

export const MemoizedObjects = memo(Objects);
