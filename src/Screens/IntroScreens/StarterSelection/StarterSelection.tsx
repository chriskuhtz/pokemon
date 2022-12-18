import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "../../../functions/generateId";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useMultiTextBox } from "../../../hooks/useMultiTextBox/useMultiTextBox";
import { useSortAndUpdatePokedex } from "../../../hooks/useSortAndUpdatePokedex/useSortAndUpdatePokedex";
import { Player } from "../../../Interfaces/Player";
import { Pokemon } from "../../../Interfaces/Pokemon";
import { PokemonQueryResponse } from "../../../Interfaces/PokemonQueryResponse";
import { ROUTES } from "../../../routes";
import {
  useGetPlayerQuery,
  useUpdateTeamMutation,
} from "../../../services/internal";

import { useGetPokemonMetaDataByNameQuery } from "../../../services/pokeApi";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { InvisibleButton } from "../../../UiComponents/InvisibleButton/InvisibleButton";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";
import { LoadingScreen } from "../../LoadingScreen/LoadingScreen";
import { oakSpriteContainer } from "../CharacterSelection/characterSelectionStyle";

export const StarterSelection = (): JSX.Element => {
  const navigate = useNavigate();
  const currentId = useMemo(() => getCurrentPlayerId() ?? -1, []);
  const { data: firstMon, isLoading: isFirstMonLoading } =
    useGetPokemonMetaDataByNameQuery("teddiursa");
  const { data: secondMon, isLoading: isSecondMonLoading } =
    useGetPokemonMetaDataByNameQuery("pancham");
  const { data: thirdMon, isLoading: isThirdMonLoading } =
    useGetPokemonMetaDataByNameQuery("cubchoo");
  const { data: player, isLoading: isPlayerLoading } =
    useGetPlayerQuery(currentId);

  const [updateTeam] = useUpdateTeamMutation();
  const { sortAndUpdatePokedex } = useSortAndUpdatePokedex();

  const paragraphs = [
    "Now, the reason i called you here today.",
    "I think you are ready to embark on your own Pokemon journey.",
    "To get you started, i want to give you your first Pokemon Partner.",
    "You can choose from these three, they are all excellent Pokemon for beginners.",
  ];

  const { index, handleClick } = useMultiTextBox(paragraphs);
  const max = paragraphs.length - 1;

  const createTeam = useCallback(
    (pokemon: PokemonQueryResponse, player: Player) => {
      const firstTeamMember: Pokemon = {
        id: generateId(),
        dexId: pokemon.id,
        ownerId: player.id,
      };

      updateTeam({ id: currentId, pokemon: [firstTeamMember] });
      sortAndUpdatePokedex(pokemon.id, true);
    },
    [updateTeam, sortAndUpdatePokedex, currentId]
  );

  const handlePokemonClick = (
    pokemon: PokemonQueryResponse,
    player: Player
  ) => {
    createTeam(pokemon, player);
    navigate(ROUTES.SENDOFF);
  };

  const isLoading =
    isFirstMonLoading ||
    isSecondMonLoading ||
    isThirdMonLoading ||
    isPlayerLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!thirdMon || !firstMon || !secondMon || currentId === -1 || !player) {
    return <ErrorScreen />;
  }

  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={<Pill onClick={handleClick}>{paragraphs[index]}</Pill>}
    >
      <Bottomer>
        <Center horizontal>
          <div>
            <div style={oakSpriteContainer}>
              <img
                alt="oak"
                src={"/assets/oak.jpeg"}
                height={index === max ? "120px" : "250px"}
              />
            </div>
            {index === max &&
              [firstMon, secondMon, thirdMon].map((pokemon) => (
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
