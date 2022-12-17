import { useLocation } from "react-router-dom";
import { BackButton } from "../../../Components/BackButton/BackButton";
import { Pokemon } from "../../../Interfaces/Pokemon";
import { useGetPokemonMetaDataByIdQuery } from "../../../services/pokemonMetaData";
import { Box } from "../../../UiComponents/Box/Box";
import { Button } from "../../../UiComponents/Button/Button";
import { Container } from "../../../UiComponents/Container/Container";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";

export const SinglePokemonScreen = (): JSX.Element => {
  const location = useLocation();

  const { pokemon } = location.state as { pokemon: Pokemon };
  const { data: metadata } = useGetPokemonMetaDataByIdQuery(pokemon.dexId);

  if (!metadata) {
    return <ErrorScreen text="cant get Pokemon" />;
  }

  return (
    <Container>
      <Box border={"thick"}>
        <BackButton />
        <img
          alt={metadata.name}
          src={metadata.sprites.front_default}
          style={{ margin: "-1.25rem" }}
          height="120px"
        />
        <h2>
          <strong>
            {pokemon.nickName} / {metadata.name}
          </strong>
        </h2>

        <Button
          onClick={() =>
            window.open(
              `https://pokemonmodules-pokedex.netlify.app/${pokemon.dexId}`,
              "_blank"
            )
          }
        >
          More Info
        </Button>
      </Box>
    </Container>
  );
};
