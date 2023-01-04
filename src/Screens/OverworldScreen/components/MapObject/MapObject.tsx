import { memo } from "react";
import { MapObjectInstance } from "../../../../Interfaces/Overworld";
import { useGetMapObjectQuery } from "../../../../services/map";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../OverworldScreen";

const MapObject = ({ object }: { object: MapObjectInstance }): JSX.Element => {
  const { data, isFetching } = useGetMapObjectQuery(object.type);

  if (!data || isFetching || object.type === 0) {
    return <></>;
  }

  return (
    <img
      src={`/assets/mapObjects/${data.name}.png`}
      alt={data.name}
      style={{
        position: absolutePosition,
        top: object.position.y * size,
        left: object.position.x * size,
        height: size * data.height,
        width: size * data.width,
      }}
    />
  );
};

export const MemoizedMapObject = memo(MapObject);
