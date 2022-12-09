import { useMemo, useState } from "react";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { useMultiTextBox } from "../../../hooks/useMultiTextBox/useMultiTextBox";
import {
  useGetPlayerQuery,
  useGetPokemonByOwnerIdQuery,
  useUpdatePlayerMutation,
  useUpdatePokemonMutation,
} from "../../../services/internal";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { TextBox } from "../../../UiComponents/TextBox/TextBox";
import { ErrorScreen } from "../../ErrorScreen/ErrorScreen";

export const SendOff = () => {
  const currentId = useMemo(() => getCurrentPlayerId(), []);
  const { data: player } = useGetPlayerQuery(currentId);
  const { data: team } = useGetPokemonByOwnerIdQuery(currentId);
  const [updatePlayer] = useUpdatePlayerMutation();
  const [updatePokemon] = useUpdatePokemonMutation();

  const [name, setName] = useState<string>("");

  const paragraphs: string[] = [
    "An excellent Choice!",
    `You and ${team?.[0].name} will make a great team.`,
    `But first, your ${team?.[0].name} needs a nickname!`,
    `${team?.[0].nickName}? What a fitting name for this Pokemon.`,
    "Now, get ready for your Pokemon adventure.",
    "Trust in your Pokemon and you can overcome any obstacle.",
    `Good luck ${player?.name}, our paths will certainly cross again on your journey.`,
  ];

  const onLastClick = () => {
    player && updatePlayer({ ...player, money: 3000 });
  };
  const { index, handleClick } = useMultiTextBox(paragraphs, () =>
    onLastClick()
  );
  const saveName = () => {
    if (team?.[0]) updatePokemon({ ...team[0], nickName: name });
    handleClick();
  };
  const showNameInput = useMemo(() => index === 2, [index]);

  if (!player || !team) {
    return <ErrorScreen />;
  }
  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={
        <TextBox
          text={paragraphs[index]}
          onClick={() => !showNameInput && handleClick()}
        />
      }
    >
      <Bottomer>
        <Center>
          <div>
            <Center>
              <img
                alt="oak"
                src={process.env.PUBLIC_URL + "/assets/oak.jpeg"}
                height="250px"
              />
            </Center>

            {showNameInput && (
              <p>
                <input
                  value={name}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setName(e.currentTarget.value)
                  }
                  placeholder={team[0].name}
                />
                <button
                  disabled={name === "" || name.length > 20}
                  onClick={saveName}
                >
                  Confirm
                </button>
              </p>
            )}
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
