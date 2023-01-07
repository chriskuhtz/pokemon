import { memo, useMemo } from "react";
import { getCurrentPlayerId } from "../../../../functions/handleCurrentPlayerId";
import { useGetPlayerQuery } from "../../../../services/internal";
import { useGetMapQuery } from "../../../../services/map";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { ErrorScreen } from "../../../ErrorScreen/ErrorScreen";
import { size } from "../../OverworldScreen";

const HelperGrid = (): JSX.Element => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? 0
  );

  if (!mapData) {
    return <ErrorScreen />;
  }

  return (
    <div
      style={{
        position: absolutePosition,
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        flexWrap: "wrap",
        width: mapData.eventLayer[0].length * size,
      }}
    >
      {mapData.eventLayer.map((row, rowIndex) => {
        return row.map((field, fieldIndex) => (
          <div
            key={rowIndex + 0.0001 * fieldIndex}
            style={{
              height: size,
              width: size,
              outline: "solid 1px red",
              color: "red",
            }}
          >
            {rowIndex}/{fieldIndex}
            <p>{field.type}</p>
          </div>
        ));
      })}
    </div>
  );
};

export const MemoizedHelperGrid = memo(HelperGrid);
