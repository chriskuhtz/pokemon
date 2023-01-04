import { useMemo } from "react";
import { getCurrentPlayerId } from "../../../../functions/handleCurrentPlayerId";
import { Direction } from "../../../../Interfaces/Overworld";
import { useGetPlayerQuery } from "../../../../services/internal";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../OverworldScreen";

export const Player = ({
  orientation,
}: {
  orientation: Direction;
}): JSX.Element => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data } = useGetPlayerQuery(currentId);

  return (
    <div
      style={{
        position: absolutePosition,
        zIndex: 2,
        top: size * 3.5,
        left: size * 7,
        width: size,
        height: size,
      }}
    >
      <img
        src={`/assets/playerSprites/${data?.character}/${orientation}.png`}
        alt={`your character`}
        width={size}
      />
    </div>
  );
};
