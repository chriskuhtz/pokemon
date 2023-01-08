import { useMultiTextBox } from "../../../../hooks/useMultiTextBox/useMultiTextBox";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { Pill } from "../../../../UiComponents/Pill/Pill";

export const OverworldDialogue = ({
  paragraphs,
  setParagraphs,
}: {
  paragraphs: string[];
  setParagraphs: (x: string[]) => void;
}): JSX.Element => {
  const { index, handleClick: nextParagraph } = useMultiTextBox(
    paragraphs,
    () => setParagraphs([])
  );
  return (
    <div
      style={{
        position: absolutePosition,
        bottom: "0",
        width: "calc(100% - 2rem)",
        padding: "1rem",
        zIndex: 1000,
        display: "block",
      }}
    >
      <Pill onClick={nextParagraph}>{paragraphs[index]}</Pill>
    </div>
  );
};
