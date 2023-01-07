import { getCurrentPlayerId } from "../../../../functions/handleCurrentPlayerId";
import { MovementDirection } from "../../../../Interfaces/Overworld";
import { useGetPlayerQuery } from "../../../../services/internal";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../OverworldScreen";

export const PlayerCharacter = ({
  orientation,
  y,
}: {
  orientation: MovementDirection;
  y: number;
}): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data: playerData, isLoading: isPlayerLoading } =
    useGetPlayerQuery(currentId);

  return (
    <img
      src={`/assets/playerSprites/${
        playerData?.character ?? 0
      }/${orientation}.png`}
      alt={`playerSprite 1`}
      width={size}
      style={{
        position: absolutePosition,
        zIndex: 2 + y,
        top: size * 3.5,
        left: size * 7,
      }}
    />
  );
};
