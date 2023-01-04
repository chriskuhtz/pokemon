import { Direction, Occupant } from "../../../../Interfaces/Overworld";
import { OverworldInhabitantDisplay } from "./variants/OverworldInhabitant/OverworldInhabitant";
import { OverworldItemDisplay } from "./variants/OverworldItem/OverworldItem";

export const FieldOccupant = ({
  occupant,
  overwrittenOrientation,
}: {
  occupant: Occupant;
  overwrittenOrientation?: Direction;
}): JSX.Element => {
  if (occupant.occupantType === "ITEM") {
    return <OverworldItemDisplay item={occupant} />;
  }
  if (occupant.occupantType === "INHABITANT") {
    return (
      <OverworldInhabitantDisplay
        inhabitant={occupant}
        overWrittenOrientation={overwrittenOrientation}
      />
    );
  }

  return <div></div>;
};
