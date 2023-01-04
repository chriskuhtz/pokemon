import {
  Direction,
  OverworldInhabitant,
} from "../../../../../../Interfaces/Overworld";
import {
  absolutePosition,
  relativePosition,
} from "../../../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../../../OverworldScreen";

export const OverworldInhabitantDisplay = ({
  inhabitant,

  overWrittenOrientation,
}: {
  inhabitant: OverworldInhabitant;

  overWrittenOrientation?: Direction;
}): JSX.Element => {
  return (
    <div
      style={{
        zIndex: 2,
        position: absolutePosition,
        top: inhabitant.position.y * size,
        left: inhabitant.position.x * size,
      }}
    >
      <img
        style={{ position: relativePosition, top: -0.5 * size }}
        src={`/assets/playerSprites/${inhabitant.characterSprite}/${
          overWrittenOrientation ?? inhabitant.inhabitantOrientation
        }.png`}
        alt={`your character`}
        width={size}
      />
    </div>
  );
};
