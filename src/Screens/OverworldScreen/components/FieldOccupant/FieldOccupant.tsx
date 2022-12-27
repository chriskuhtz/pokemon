import { Occupant } from "../../../../Interfaces/Overworld";
import { OverworldInhabitantDisplay } from "./variants/OverworldInhabitant/OverworldInhabitant";
import { OverworldItemDisplay } from "./variants/OverworldItem/OverworldItem";

export const FieldOccupant = ({
  occupant,
  size,
}: {
  occupant: Occupant;
  size: number;
}): JSX.Element => {
  if (occupant.occupantType === "ITEM") {
    return <OverworldItemDisplay item={occupant} size={size} />;
  }
  if (occupant.occupantType === "INHABITANT") {
    return <OverworldInhabitantDisplay inhabitant={occupant} size={size} />;
  }

  return <div></div>;
};
