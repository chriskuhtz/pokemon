import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useUpdatePlayerMutation } from "../../services/player";
import { BottomContent } from "../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { TextBox } from "../../UiComponents/TextBox/TextBox";

export const NameSelection = (): JSX.Element => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const [updatePlayer] = useUpdatePlayerMutation();

  const saveName = () => {
    updatePlayer({
      id: Math.floor(Math.random() * 1000),
      name: name,
    });
    navigate(ROUTES.CHARACTERSELECTION);
  };

  return (
    <BottomContent
      bottomContent={<TextBox text={"Now, what was your name again?"} />}
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

            <p>
              <input
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
                placeholder="Ash"
              />
              <button
                disabled={name === "" || name.length > 20}
                onClick={saveName}
              >
                Confirm
              </button>
            </p>
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
