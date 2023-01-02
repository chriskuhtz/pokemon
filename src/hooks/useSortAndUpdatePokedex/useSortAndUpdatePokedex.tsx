import { useMemo } from "react";
import { getCurrentPlayerId } from "../../functions/handleCurrentPlayerId";
import {
  useGetPokedexQuery,
  useUpdatePokedexMutation,
} from "../../services/internal";
import { useLazyGetPokemonMetaDataByIdQuery } from "../../services/pokeApi";
import { Pill } from "../../UiComponents/Pill/Pill";
import { useCustomToast } from "../useCustomToast/useCustomToast";

export const useSortAndUpdatePokedex = () => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: pokedex } = useGetPokedexQuery(currentId);
  const [updatePokedex] = useUpdatePokedexMutation();
  const [getPokemonMetaDataById] = useLazyGetPokemonMetaDataByIdQuery();
  const { notify } = useCustomToast();

  const isIncluded = (array: number[], newEntry: number) => {
    return array.find((i) => i === newEntry);
  };
  const updateArray = (array: number[], newEntry: number): number[] => {
    if (isIncluded(array, newEntry)) {
      return array;
    }
    const index: number = array.findIndex((i) => i > newEntry) ?? -1;

    const tempArray: number[] = [...array];
    if (index === -1) {
      tempArray.push(newEntry);
    } else tempArray.splice(index, 0, newEntry);
    return tempArray;
  };

  const sortAndUpdatePokedex = async (newEntry: number, owned?: boolean) => {
    const { name } = await getPokemonMetaDataById(newEntry).unwrap();
    if (
      pokedex &&
      !isIncluded(pokedex.seen, newEntry) &&
      ((owned && !isIncluded(pokedex.owned, newEntry)) || !owned)
    ) {
      const updatedDex = {
        ...pokedex,
        seen: updateArray(pokedex.seen, newEntry),
        owned: owned ? updateArray(pokedex.owned, newEntry) : pokedex?.owned,
      };

      await updatePokedex(updatedDex);
      notify(
        <Pill>
          <>
            {owned ? "registered " : "seen "}
            {name}
          </>
        </Pill>
      );
    } else console.error("could not load pokedex");
  };

  return { sortAndUpdatePokedex };
};
