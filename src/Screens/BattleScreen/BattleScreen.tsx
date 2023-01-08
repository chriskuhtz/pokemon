import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCustomToast } from "../../hooks/useCustomToast/useCustomToast";
import { useSortAndUpdatePokedex } from "../../hooks/useSortAndUpdatePokedex/useSortAndUpdatePokedex";
import { OpponentInitializer } from "../../Interfaces/Opponent";
import { useGetPokemonMetaDataByIdQuery } from "../../services/pokeApi";
import { RoundButton } from "../../UiComponents/RoundButton/RoundButton";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";
import { useRunAway } from "./hooks/useRunAway";

export const BattleScreen = ({}: {}): JSX.Element => {
  //location and state
  const location = useLocation();
  const opponent: OpponentInitializer = location.state;
  const [activePokemonId, setactivePokemonId] = useState<number>(
    opponent.pokemon[0]
  );
  //external Data

  const { data } = useGetPokemonMetaDataByIdQuery(activePokemonId);

  //hooks
  const { notify } = useCustomToast();
  const { sortAndUpdatePokedex } = useSortAndUpdatePokedex();
  const { tryToRunAway } = useRunAway();

  //state

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
      <RoundButton onClick={tryToRunAway}>Run Away</RoundButton>
      <img src={data.sprites.other["official-artwork"].front_default} />
    </div>
  );
};
