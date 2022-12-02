import React, { useState } from "react";
import { BottomContent } from "../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../UiComponents/FlexBoxes/Center/Center";
import { TextBox } from "../../UiComponents/TextBox/TextBox";

export const NameSelection = (): JSX.Element => {
  const [name, setName] = useState<string>("");

  const saveName = () => {};
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
              <button onClick={saveName}>Confirm</button>
            </p>
          </div>
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
