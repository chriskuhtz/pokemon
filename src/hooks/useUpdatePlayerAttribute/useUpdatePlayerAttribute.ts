import { useMemo } from "react";
import { getCurrentPlayerId } from "../../functions/handleCurrentPlayerId";
import { PlayerLocation } from "../../Interfaces/Player";
import {
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../services/internal";

export const useUpdatePlayerAttribute = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const [updatePlayer] = useUpdatePlayerMutation();

  const updatePlayerAttribute = ({
    playerLocation,
    collectedItem,
  }: {
    playerLocation: PlayerLocation;
    collectedItem?: number;
  }) => {
    if (!playerData) {
      console.error("no playerData available");
      return;
    }
    const newPlayer = { ...playerData };

    if (playerLocation) {
      newPlayer.playerLocation = playerLocation;
    }
    if (playerLocation && collectedItem) {
      const { mapId } = playerLocation;
      const { overworldProgress } = newPlayer;

      //find the correct mapProgress and add the item
      const existingMapProgress = overworldProgress.find(
        (map) => map.mapId === mapId
      );
      const mapToUpdate = existingMapProgress ?? {
        mapId: mapId,
        collectedItems: [],
      };
      mapToUpdate.collectedItems.push(collectedItem);

      //update the mapProgressArray
      const index = overworldProgress.findIndex(
        (progress) => progress.mapId === mapToUpdate.mapId
      );
      if (index !== -1) {
        overworldProgress.splice(index, 1);
      }
      newPlayer.overworldProgress =
        newPlayer.overworldProgress.concat(mapToUpdate);
    }

    updatePlayer(newPlayer);
  };
  return { updatePlayerAttribute };
};
