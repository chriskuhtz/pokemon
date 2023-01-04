import {
  Direction,
  Occupant,
  Position,
} from "../../../../Interfaces/Overworld";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { FieldOccupant } from "../FieldOccupant/FieldOccupant";

export const CurrentMap = ({
  size,
  position,
  occupants,
  height,
  width,
  overwrittenNpcs,
  rotatingNpcs,
}: {
  size: number;
  position: Position;
  occupants: Occupant[];
  height: number;
  width: number;
  overwrittenNpcs: { id: number; direction: Direction }[];
  rotatingNpcs: { id: number; direction: Direction }[];
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
        <img
          src={`/assets/maps/PalletTown.png`}
          height={size * height}
          width={size * width}
        />
        {occupants.map((o) => (
          <FieldOccupant
            key={o.id}
            occupant={o}
            size={size}
            overwrittenOrientation={
              rotatingNpcs.find((npc) => npc.id === o.id)?.direction ??
              overwrittenNpcs.find((npc) => npc.id === o.id)?.direction
            }
          />
        ))}
      </div>
    </div>
  );
};
