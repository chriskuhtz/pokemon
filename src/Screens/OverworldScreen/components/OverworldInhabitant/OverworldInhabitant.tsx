import { memo, useEffect, useState } from "react";
import { getClockwiseNextDirection } from "../../../../functions/getClockwiseNextDirection";
import {
  Direction,
  OverworldInhabitant,
} from "../../../../Interfaces/Overworld";
import {
  absolutePosition,
  relativePosition,
} from "../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../OverworldScreen";

export const OverworldInhabitantDisplay = ({
  inhabitant,
}: {
  inhabitant: OverworldInhabitant;
}): JSX.Element => {
  const [orientation, setOrientation] = useState<Direction>(
    inhabitant.inhabitantOrientation
  );

  //try to rotate every second, 50% succes rate
  const rotate = () => {
    const randomValue = Math.random();
    if (randomValue > 0.5) {
      setOrientation(getClockwiseNextDirection(orientation));
    }
  };

  useEffect(() => {
    if (inhabitant.rotating === true) {
      const rotationInterval = setInterval(() => {
        rotate();
      }, 1000);
      return () => {
        clearInterval(rotationInterval);
      };
    }
  }, [orientation]);

  return (
    <div
      style={{
        zIndex: 2 + inhabitant.position.y,
        position: absolutePosition,
        top: inhabitant.position.y * size,
        left: inhabitant.position.x * size,
      }}
    >
      <img
        style={{ position: relativePosition, top: -0.5 * size }}
        src={`/assets/playerSprites/${inhabitant.characterSprite}/${
          inhabitant.rotating ? orientation : inhabitant.inhabitantOrientation
        }.png`}
        alt={`an npc`}
        width={size}
      />
    </div>
  );
};

export const MemoizedOverworldInhabitant = memo(OverworldInhabitantDisplay);
