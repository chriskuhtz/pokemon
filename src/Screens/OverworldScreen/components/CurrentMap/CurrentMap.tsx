import { MapField, Position } from "../../../../Interfaces/Overworld";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { Field } from "../Field/Field";

export const CurrentMap = ({
  size,
  position,

  map,
}: {
  size: number;
  position: Position;

  map: MapField[][];
}): JSX.Element => {
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: absolutePosition,
        top: 0,
        left: 0,
      }}
      id={"viewport"}
    >
      <div
        style={{ backgroundColor: "black", width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: absolutePosition,
          top: (-position.y + 4) * size,
          left: (-position.x + 7) * size,
        }}
      >
        {map.map((row, rowId) => (
          <div style={{ display: "flex" }} key={rowId}>
            {row.map((field, fieldId) => (
              <Field
                size={size}
                field={field}
                fieldId={fieldId}
                rowId={rowId}
                key={fieldId}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
