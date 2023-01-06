import { memo } from "react";
import { getCurrentPlayerId } from "../../../../functions/handleCurrentPlayerId";
import { OverworldItem } from "../../../../Interfaces/Overworld";
import { useGetPlayerQuery } from "../../../../services/internal";
import { useGetItemMetaDataByNameQuery } from "../../../../services/pokeApi";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { size } from "../../OverworldScreen";

const OverworldItemDisplay = ({
  item,
}: {
  item: OverworldItem;
}): JSX.Element => {
  const { data, isLoading } = useGetItemMetaDataByNameQuery("poke-ball");
  const currentId = getCurrentPlayerId();
  const { data: playerData, isLoading: isPlayerLoading } =
    useGetPlayerQuery(currentId);

  if (isLoading || isPlayerLoading) {
    return <></>;
  }
  if (!data || !playerData) {
    console.error("cant display: ", item);
    return <></>;
  }

  const currentMapProgress = playerData.overworldProgress.find(
    (mapProgress) => mapProgress.mapId === playerData.playerLocation.mapId
  );
  if (
    !currentMapProgress?.collectedItems.find((itemId) => itemId === item.id)
  ) {
    return (
      <div
        style={{
          zIndex: 2 + item.position.y,
          position: absolutePosition,
          top: item.position.y * size,
          left: item.position.x * size,
        }}
      >
        <img
          style={{ position: "relative" }}
          alt={"item on the ground"}
          src={data?.sprites.default}
          width={size}
        />
      </div>
    );
  }

  return <div></div>;
};

export const MemoizedOverworldItem = memo(OverworldItemDisplay);
