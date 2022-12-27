import { OverworldInhabitant } from "../../../../../../Interfaces/Overworld";
import { relativePosition } from "../../../../../../UiComponents/GlobalStyles/globalStyles";

export const OverworldInhabitantDisplay = ({
  inhabitant,
  size,
}: {
  inhabitant: OverworldInhabitant;
  size: number;
}): JSX.Element => {
  return (
    <div style={{ zIndex: 2 }}>
      <img
        style={{ position: relativePosition, top: -0.5 * size }}
        src={`/assets/playerSprites/${inhabitant.characterSprite}/${inhabitant.inhabitantOrientation}.png`}
        alt={`your character`}
        width={size}
      />
    </div>
  );
};
