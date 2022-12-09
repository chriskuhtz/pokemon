import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "../../../functions/generateId";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useMultiTextBox } from "../../../hooks/useMultiTextBox/useMultiTextBox";
import { Player } from "../../../Interfaces/Player";
import { Pokemon } from "../../../Interfaces/Pokemon";
import { PokemonQueryResponse } from "../../../Interfaces/PokemonQueryResponse";
import { ROUTES } from "../../../routes";
import {
  useAddPokemonMutation,
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../../services/internal";

import { useGetPokemonMetaDataByNameQuery } from "../../../services/pokemonMetaData";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { InvisibleButton } from "../../../UiComponents/InvisibleButton/InvisibleButton";
import { TextBox } from "../../../UiComponents/TextBox/TextBox";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";
import { oakSpriteContainer } from "../CharacterSelection/characterSelectionStyle";

export const StarterSelection = (): JSX.Element => {
  const navigate = useNavigate();
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: bulbasaur } = useGetPokemonMetaDataByNameQuery("bulbasaur");
  const { data: squirtle } = useGetPokemonMetaDataByNameQuery("squirtle");
  const { data: charmander } = useGetPokemonMetaDataByNameQuery("charmander");
  const { data: player } = useGetPlayerQuery(currentId);
  const [updatePlayer] = useUpdatePlayerMutation();
  const [addPokemon] = useAddPokemonMutation();

  const paragraphs = [
    "Now, the reason i called you here today.",
    "I think you are ready to embark on your own Pokemon journey.",
    "To get you started, i want to give you your first Pokemon Partner.",
    "You can choose from these three, they are all excellent Pokemon for beginners.",
  ];

  const { index, handleClick } = useMultiTextBox(paragraphs);
  const max = paragraphs.length - 1;

  const createTeam = (pokemon: PokemonQueryResponse, player: Player) => {
    const firstTeamMember: Pokemon = {
      id: generateId(),
      name: pokemon.name,
      frontSprite: pokemon.sprites.front_default,
      ownerId: player.id,
    };
    updatePlayer({ ...player });
    addPokemon(firstTeamMember);
  };

  const handlePokemonClick = (
    pokemon: PokemonQueryResponse,
    player: Player
  ) => {
    createTeam(pokemon, player);
    navigate(ROUTES.SENDOFF);
  };

  if (!charmander || !bulbasaur || !squirtle || currentId === -1 || !player) {
    return <ErrorScreen />;
  }

  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={<TextBox text={paragraphs[index]} onClick={handleClick} />}
    >
      <Bottomer>
        <Center>
          <div>
            <div style={oakSpriteContainer}>
              <img
                alt="oak"
                src={"/assets/oak.jpeg"}
                height={index === max ? "120px" : "250px"}
              />
            </div>
            {index === max &&
              [bulbasaur, squirtle, charmander].map((pokemon) => (
                <InvisibleButton
                  onClick={() => handlePokemonClick(pokemon, player)}
                  key={pokemon.name}
                >
                  <img
                    alt={pokemon.name}
                    src={pokemon.sprites.front_default}
                    height="120px"
                  />
                </InvisibleButton>
              ))}
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
