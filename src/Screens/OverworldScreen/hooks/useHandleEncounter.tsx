import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
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

  const randomRouteEncounter = () => {
    if (!mapData?.encounters) {
      return;
    }
    const { encounters } = mapData;
    const index = Math.floor(Math.random() * encounters.length);

    navigate(ROUTES.BATTLE, { state: { pokemon: [encounters[index]] } });
  };

  return { randomRouteEncounter };
};
