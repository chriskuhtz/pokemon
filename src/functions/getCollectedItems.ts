import { Player } from "../Interfaces/Player";

export const getCollectedItems = (playerData: Player): number[] => {
  const { mapId } = playerData.playerLocation;

  return (
    playerData.overworldProgress.find((progress) => progress.mapId === mapId)
      ?.collectedItems ?? []
  );
};
