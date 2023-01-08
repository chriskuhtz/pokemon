import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCustomToast } from "../../hooks/useCustomToast/useCustomToast";
import { useSortAndUpdatePokedex } from "../../hooks/useSortAndUpdatePokedex/useSortAndUpdatePokedex";
import { OpponentInitializer } from "../../Interfaces/Opponent";
import { useGetPokemonMetaDataByIdQuery } from "../../services/pokeApi";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";

export const BattleScreen = ({}: {}): JSX.Element => {
  const { notify } = useCustomToast();
  const location = useLocation();
  const opponent: OpponentInitializer = location.state;

  const [activePokemon, setActivePokemon] = useState<number>(
    opponent.pokemon[0]
  );
  const { data } = useGetPokemonMetaDataByIdQuery(activePokemon);
  const { sortAndUpdatePokedex } = useSortAndUpdatePokedex();

  useEffect(() => {
    if (data) {
      notify(`a wild ${data.name} appears!`);
      sortAndUpdatePokedex(data.id);
    }
  }, [data]);

  if (!data) {
    return <ErrorScreen />;
  }

  return (
    <div>
      !BATTLE!
      <img src={data.sprites.other["official-artwork"].front_default} />
    </div>
  );
};
