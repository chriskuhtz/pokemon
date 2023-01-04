import { useCallback, useEffect, useState } from "react";
import { getClockwiseNextDirection } from "../../../functions/getClockwiseNextDirection";
import { getOppositeDirection } from "../../../functions/getOppositeDirection";
import { Direction, OverWorldMap } from "../../../Interfaces/Overworld";
import { tickSpeed } from "../OverworldScreen";

export const useOverwrittenNpcs = (mapData?: OverWorldMap) => {
  const [overwrittenNpcs, setOverwrittenNpcs] = useState<
    { id: number; direction: Direction }[]
  >([]);

  const [rotatingNpcs, setRotatingNpcs] = useState<
    { id: number; direction: Direction }[]
  >([]);

  const removeFromRotating = (id: number) => {
    const index = rotatingNpcs.findIndex((npc) => npc.id === id);
    if (index !== -1) {
      const updatedNpcs = [...rotatingNpcs];
      updatedNpcs.splice(index, 1);
      setRotatingNpcs(updatedNpcs);
    }
  };
  const upsertOverwrittenNpc = (id: number, playerOrientation: Direction) => {
    const index = overwrittenNpcs.findIndex((npc) => npc.id === id);
    const newNpc = {
      id: id,
      direction: getOppositeDirection(playerOrientation),
    };
    if (index === -1) {
      setOverwrittenNpcs([...overwrittenNpcs, newNpc]);
    } else {
      const updatedNpcs = [...overwrittenNpcs];
      updatedNpcs.splice(index, 1, newNpc);
      setOverwrittenNpcs(updatedNpcs);
    }
    removeFromRotating(id);
  };

  const rotateNpcs = useCallback(() => {
    const rotatedNpcs = rotatingNpcs.map((r) => {
      let newDirection =
        Math.random() > 0.9
          ? getClockwiseNextDirection(r.direction)
          : r.direction;
      return { id: r.id, direction: newDirection };
    });

    setRotatingNpcs(rotatedNpcs);
  }, [rotatingNpcs]);

  useEffect(() => {
    if (mapData) {
      const rotators: { id: number; direction: Direction }[] = [];
      mapData.occupants.forEach((o) => {
        if (o.occupantType === "INHABITANT" && o.rotating) {
          rotators.push({ id: o.id, direction: o.inhabitantOrientation });
        }
      });
      setRotatingNpcs(rotators);
    }
  }, [mapData]);

  useEffect(() => {
    const rotationInternal = setInterval(() => {
      rotateNpcs();
    }, tickSpeed);
    return () => {
      clearInterval(rotationInternal);
    };
  }, [rotateNpcs, rotatingNpcs]);

  return { overwrittenNpcs, upsertOverwrittenNpc, rotateNpcs, rotatingNpcs };
};
