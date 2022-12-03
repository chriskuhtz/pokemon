import { useNavigate } from "react-router-dom";
import { PlayerSprite } from "../../Components/PlayerSprite/PlayerSprite";
import { ROUTES } from "../../routes";
import {
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../services/player";
import { BottomContent } from "../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { TextBox } from "../../UiComponents/TextBox/TextBox";
import { oakSpriteContainer } from "./characterSelectionStyle";

export const CharacterSelection = (): JSX.Element => {
  const navigate = useNavigate();
  const { data } = useGetPlayerQuery();
  const [updatePlayer] = useUpdatePlayerMutation();

  const saveCharacter = (character: number) => {
    const currentPlayer = data;
    if (currentPlayer && character) {
      updatePlayer({ ...currentPlayer, character: character });
      navigate(ROUTES.CHARACTEROVERVIEW);
    } else
      console.error("Current Player:", currentPlayer, "Character: ", character);
  };

  return (
    <BottomContent
      bottomContent={<TextBox text={"And what do you look like?"} />}
    >
      <Bottomer>
        <Center>
          <div>
            <Center>
              <div>
                <div style={oakSpriteContainer}>
                  <img
                    alt="oak"
                    src={process.env.PUBLIC_URL + "/assets/oak.jpeg"}
                    height="120px"
                  />
                </div>
                <div>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <PlayerSprite id={i} onClick={() => saveCharacter(i)} />
                  ))}
                </div>
              </div>
            </Center>
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
