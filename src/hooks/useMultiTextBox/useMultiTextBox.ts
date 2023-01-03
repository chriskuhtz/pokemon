import { useState } from "react";

export const useMultiTextBox = (
  paragraphs: string[],
  onLastClick?: () => void,
  onIndexActions?: { index: number; action: () => void }[]
): { index: number; handleClick: () => void } => {
  const [index, setIndex] = useState<number>(0);

  const handleClick = () => {
    const max = paragraphs.length - 1;
    // if (max === -1) {
    //   return;
    // }

    const extraActionIndex = onIndexActions?.findIndex(
      (indexAction) => indexAction.index === index
    );

    if (extraActionIndex !== undefined && extraActionIndex !== -1) {
      onIndexActions?.[extraActionIndex].action();
    }
    if (index < max) {
      setIndex(index + 1);
    } else {
      onLastClick && onLastClick();
      setIndex(0);
    }
  };
  return { index, handleClick };
};
