import { Direction, Occupant } from "../../../../Interfaces/Overworld";
import { OverworldInhabitantDisplay } from "./variants/OverworldInhabitant/OverworldInhabitant";
import { OverworldItemDisplay } from "./variants/OverworldItem/OverworldItem";

export const FieldOccupant = ({
  occupant,
  size,
  overwrittenOrientation,
}: {
  occupant: Occupant;
  size: number;
  overwrittenOrientation?: Direction;
}): JSX.Element => {
  if (occupant.occupantType === "ITEM") {
    return <OverworldItemDisplay item={occupant} size={size} />;
  }
  if (occupant.occupantType === "INHABITANT") {
    return (
      <OverworldInhabitantDisplay
        inhabitant={occupant}
        size={size}
        overWrittenOrientation={overwrittenOrientation}
      />
    );
  }

  return <div></div>;
};
