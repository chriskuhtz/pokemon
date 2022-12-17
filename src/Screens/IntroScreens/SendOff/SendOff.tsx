import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../../../Components/ConfirmButton/ConfirmButton";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useMultiTextBox } from "../../../hooks/useMultiTextBox/useMultiTextBox";
import { ROUTES } from "../../../routes";
import {
  useGetPlayerQuery,
  useGetTeamQuery,
  useUpdatePlayerMutation,
  useUpdateTeamMutation,
} from "../../../services/internal";
import { useGetPokemonMetaDataByIdQuery } from "../../../services/pokemonMetaData";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { LoadingScreen } from "../../LoadingScreen/LoadingScreen";

export const SendOff = () => {
  const navigate = useNavigate();
  const currentId = useMemo(() => getCurrentPlayerId(), []);
  const { data: player } = useGetPlayerQuery(currentId);
  const { data: team } = useGetTeamQuery(currentId);
  const { data: pokemonMetaData } = useGetPokemonMetaDataByIdQuery(
    team?.pokemon[0].dexId ?? -1
  );
  const [updatePlayer] = useUpdatePlayerMutation();
  const [updateTeam] = useUpdateTeamMutation();

  const [name, setName] = useState<string>("");

  const paragraphs: string[] = [
    "An excellent Choice!",
    `You and ${pokemonMetaData?.name} will make a great team.`,
    `But first, your ${pokemonMetaData?.name} needs a nickname!`,
    `${team?.pokemon?.[0].nickName}? What a fitting name for this Pokemon.`,
    "Now, get ready for your Pokemon adventure.",
    "Trust in your Pokemon and you can overcome any obstacle.",
    `Good luck ${player?.name}, our paths will certainly cross again on your journey.`,
  ];

  const onLastClick = () => {
    player && updatePlayer({ ...player, money: 3000 });
    navigate(ROUTES.PLAYERMENU);
  };
  const { index, handleClick } = useMultiTextBox(paragraphs, () =>
    onLastClick()
  );
  const saveName = () => {
    if (team?.pokemon[0])
      updateTeam({
        ...team,
        pokemon: [{ ...team.pokemon[0], nickName: name }],
      });
    handleClick();
  };
  const showNameInput = useMemo(() => index === 2, [index]);

  if (!player || !team || !pokemonMetaData) {
    return <LoadingScreen />;
  }
  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={
        <Pill onClick={() => !showNameInput && handleClick()}>
          {paragraphs[index]}
        </Pill>
      }
    >
      <Bottomer>
        <Center horizontal>
          <div>
            <Center horizontal>
              <img
                alt="oak"
                src={process.env.PUBLIC_URL + "/assets/oak.jpeg"}
                height="250px"
              />
            </Center>

            {showNameInput && (
              <Center vertical>
                <input
                  value={name}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setName(e.currentTarget.value)
                  }
                  placeholder={pokemonMetaData.name}
                />
                <ConfirmButton
                  disabled={name === "" || name.length > 20}
                  onClick={saveName}
                />
              </Center>
            )}
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
