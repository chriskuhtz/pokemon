import { BottomContent } from "../../../UiComponents/BottomContent/BottomContent";
import { Bottomer } from "../../../UiComponents/FlexBoxes/Bottomer/Bottomer";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { Pill } from "../../../UiComponents/Pill/Pill";
import { paragraphs } from "./introParagraphs";
import { useIntro } from "./useIntro";

export const Intro = (): JSX.Element => {
  const { index, pikaStyle, handleClick } = useIntro();
  return (
    <BottomContent
      justifyContent="flex-end"
      bottomContent={<Pill onClick={handleClick}>{paragraphs[index]}</Pill>}
    >
      <Bottomer>
        <Center horizontal>
          <img
            alt="pikachu"
            style={pikaStyle}
            src={process.env.PUBLIC_URL + "/assets/pikachu.png"}
          />
          <img
            alt="oak"
            src={process.env.PUBLIC_URL + "/assets/oak.jpeg"}
            height="250px"
          />
        </Center>
      </Bottomer>
    </BottomContent>
  );
};
