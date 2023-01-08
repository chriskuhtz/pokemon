import { useGetPokemonMetaDataByIdQuery } from "../../../../services/pokeApi";
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
      <Pill
        border={owned ? "thick" : "thin"}
        onClick={() =>
          window.open(
            `https://pokemonmodules-pokedex.netlify.app/${id}`,
            "_blank"
          )
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4rem",
            width: "100%",
            margin: "-.5rem",
          }}
        >
          {" "}
          <img
            alt={data.name}
            src={data.sprites.other["official-artwork"].front_default}
            style={{
              margin: "-1rem",
              filter: owned ? "none" : "grayscale(1)",
            }}
            height="80px"
          />
          {owned ? <strong>{data.name}</strong> : data.name}
        </div>
      </Pill>
    </div>
  );
};
