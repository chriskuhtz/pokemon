import {
  Direction,
  MapObjectInstance,
  Occupant,
  Position,
} from "../../../../Interfaces/Overworld";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../OverworldScreen";
import { FieldOccupant } from "../FieldOccupant/FieldOccupant";
import { MemoizedObjects } from "../Objects/Objects";

export const CurrentMap = ({
  position,
  occupants,
  objects,
  height,
  width,
  overwrittenNpcs,
  rotatingNpcs,
}: {
  position: Position;
  occupants: Occupant[];
  objects: MapObjectInstance[];
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
          alt="palletTown"
          height={size * height}
          width={size * width}
        />
        <MemoizedObjects objects={objects} />
        {occupants.map((o) => (
          <FieldOccupant
            key={o.id}
            occupant={o}
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
