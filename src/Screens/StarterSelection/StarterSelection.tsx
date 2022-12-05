import { useMemo, useState } from "react";
import { generateId } from "../../functions/generateId";
import { getCurrentPlayerId } from "../../functions/handleCurrentPlayerId";
import { Player } from "../../Interfaces/Player";
import { Pokemon } from "../../Interfaces/Pokemon";
import { PokemonQueryResponse } from "../../Interfaces/PokemonQueryResponse";
import {
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../services/player";
import { useAddPokemonMutation } from "../../services/pokemon";
import { useGetPokemonMetaDataByNameQuery } from "../../services/pokemonMetaData";
import { BottomContent } from "../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { InvisibleButton } from "../../UiComponents/InvisibleButton/InvisibleButton";
import { TextBox } from "../../UiComponents/TextBox/TextBox";
import { oakSpriteContainer } from "../CharacterSelection/characterSelectionStyle";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";

export const StarterSelection = (): JSX.Element => {
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: bulbasaur } = useGetPokemonMetaDataByNameQuery("bulbasaur");
  const { data: squirtle } = useGetPokemonMetaDataByNameQuery("squirtle");
  const { data: charmander } = useGetPokemonMetaDataByNameQuery("charmander");
  const { data: player } = useGetPlayerQuery(currentId);
  const [updatePlayer] = useUpdatePlayerMutation();
  const [addPokemon] = useAddPokemonMutation();

  const [index, setIndex] = useState<number>(0);
  const paragraphs = [
    "Now, the reason i called you here today.",
    "I think you are ready to embark on your own Pokemon journey.",
    "To get you started, i want to give you your first Pokemon Partner.",
    "You can choose from these three, they are all excellent Pokemon for beginners.",
  ];
  const max = paragraphs.length - 1;

  const handleTextBoxClick = () => {
    if (index < max) {
      setIndex(index + 1);
    }
  };

  const createTeam = (pokemon: PokemonQueryResponse, player: Player) => {
    const firstTeamMember: Pokemon = {
      id: generateId(),
      name: pokemon.name,
      frontSprite: pokemon.sprites.front_default,
    };
    updatePlayer({ ...player, team: [firstTeamMember.id] });
    addPokemon(firstTeamMember);
  };

  if (!charmander || !bulbasaur || !squirtle || currentId == -1 || !player) {
    return <ErrorScreen />;
  }

  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={
        <TextBox text={paragraphs[index]} onClick={handleTextBoxClick} />
      }
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
                <InvisibleButton onClick={() => createTeam(pokemon, player)}>
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
