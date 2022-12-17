import { useGetPokemonMetaDataByIdQuery } from "../../../../services/pokemonMetaData";
import { Pill } from "../../../../UiComponents/Pill/Pill";

export const PokedexListItem = ({
  id,
  owned,
}: {
  id: number;
  owned: boolean;
}): JSX.Element => {
  const { data } = useGetPokemonMetaDataByIdQuery(id);

  if (!data) {
    return <div>LOADING</div>;
  }
  return (
    <div style={{ marginBottom: ".5rem" }}>
      <Pill border={owned ? "thick" : "thin"}>{data?.name}</Pill>
    </div>
  );
};
