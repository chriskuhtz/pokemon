import { useGetMapQuery } from "../../../../services/map";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { ErrorScreen } from "../../../ErrorScreen/ErrorScreen";
import { LoadingScreen } from "../../../LoadingScreen/LoadingScreen";
import { size } from "../../OverworldScreen";

export const HelperGrid = (): JSX.Element => {
  const { data: mapData, isFetching } = useGetMapQuery(0);

  if (isFetching) {
    return <LoadingScreen />;
  }
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
