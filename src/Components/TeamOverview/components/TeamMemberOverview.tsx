import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../../Interfaces/Pokemon";
import { ROUTES } from "../../../routes";
import { ErrorScreen } from "../../../Screens/ErrorScreen/ErrorScreen";
import { useGetPokemonMetaDataByIdQuery } from "../../../services/pokeApi";
import { Box } from "../../../UiComponents/Box/Box";

export const TeamMemberOverview = ({
  pokemon,
}: {
  pokemon: Pokemon;
}): JSX.Element => {
  const navigate = useNavigate();
  const { data: metadata } = useGetPokemonMetaDataByIdQuery(pokemon.dexId);

  if (!metadata) {
    return <ErrorScreen text="cant get Pokemon" />;
  }

  return (
    <Box
      border={"thick"}
      onClick={() => navigate(ROUTES.SINGLEPOKEMON, { state: { pokemon } })}
    >
      <img
        alt={metadata.name}
        src={metadata.sprites.other["official-artwork"].front_default}
        height="80px"
      />
    </Box>
  );
};
