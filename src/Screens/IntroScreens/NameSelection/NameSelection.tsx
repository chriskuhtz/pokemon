import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmButton } from "../../../Components/ConfirmButton/ConfirmButton";
import { useCreatePlayer } from "../../../hooks/useCreatePlayer";
import { ROUTES } from "../../../routes";
import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { Pill } from "../../../UiComponents/Pill/Pill";

export const NameSelection = (): JSX.Element => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const { createPlayer } = useCreatePlayer();

  const saveName = async () => {
    await createPlayer(name);
    navigate(ROUTES.CHARACTERSELECTION);
  };

  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={<Pill>"Now, what was your name again?"</Pill>}
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

            <Center vertical>
              <input
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
                placeholder="Ash"
              />
              <ConfirmButton
                disabled={name === "" || name.length > 20}
                onClick={() => void saveName()}
              />
            </Center>
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
