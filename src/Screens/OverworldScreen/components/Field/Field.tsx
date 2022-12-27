import { MapField } from "../../../../Interfaces/Overworld";
import { FieldOccupant } from "../FieldOccupant/FieldOccupant";

export const Field = ({
  size,
  field,
  fieldId,
  rowId,
}: {
  size: number;
  field: MapField;
  fieldId: number;
  rowId: number;
}) => {
  let backgroundColor: string = "lightgreen";

  if (field.texture === "rock") {
    backgroundColor = "saddlebrown";
  }
  if (field.texture === "city") {
    backgroundColor = "lightgray";
  }

  return (
    <div
      style={{
        minHeight: `${size}px`,
        minWidth: `${size}px`,
        maxHeight: `${size}px`,
        maxWidth: `${size}px`,
        backgroundColor: backgroundColor,
        outline: field.texture !== "field" ? "1px solid black" : "none",
        zIndex: 1,
      }}
    >
      {field.occupant && (
        <FieldOccupant occupant={field.occupant} size={size} />
      )}

      {field.texture === "field" ? (
        <img
          src={process.env.PUBLIC_URL + "/assets/textures/Grass.png"}
          height={"100%"}
        />
      ) : (
        rowId + "/" + fieldId
      )}
    </div>
  );
};
