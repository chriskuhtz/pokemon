import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useUpdatePlayerAttribute } from "../../../hooks/useUpdatePlayerAttribute/useUpdatePlayerAttribute";
import { PlayerLocation } from "../../../Interfaces/Player";
import { ROUTES } from "../../../routes";
import { useGetPlayerQuery } from "../../../services/internal";
import { useGetMapQuery } from "../../../services/map";

export const useHandleEncounter = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: playerData } = useGetPlayerQuery(currentId);
  const { data: mapData } = useGetMapQuery(
    playerData?.playerLocation.mapId ?? -1
  );

  const navigate = useNavigate();
  const { updatePlayerAttribute } = useUpdatePlayerAttribute();

  const randomRouteEncounter = (newLocation: PlayerLocation) => {
    if (!mapData?.encounters || Math.random() < 0.8) {
      return;
    }
    const { encounters } = mapData;
    const index = Math.floor(Math.random() * encounters.length);
    updatePlayerAttribute({
      playerLocation: newLocation,
    });
    navigate(ROUTES.BATTLE, { state: { pokemon: [encounters[index]] } });
  };

  return { randomRouteEncounter };
};
