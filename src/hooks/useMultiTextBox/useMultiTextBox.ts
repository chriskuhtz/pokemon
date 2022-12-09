import { useState } from "react";

export const useMultiTextBox = (
  paragraphs: string[],
  onLastClick?: () => void
): { index: number; handleClick: () => void } => {
  const [index, setIndex] = useState<number>(0);

  const handleClick = () => {
    const max = paragraphs.length - 1;

    if (index < max) {
      setIndex(index + 1);
    } else onLastClick && onLastClick();
  };
  return { index, handleClick };
};
