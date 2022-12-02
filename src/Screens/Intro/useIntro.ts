import { useMemo, useState } from "react";
import { paragraphs } from "./introParagraphs";
import { pikachuStyle } from "./introStyle";

export const useIntro = () => {
  const [index, setIndex] = useState<number>(0);

  const pikaStyle = useMemo(() => {
    return pikachuStyle(index);
  }, [index]);

  const handleClick = () => {
    const max = paragraphs.length - 1;

    if (index < max) {
      setIndex(index + 1);
    } else console.log("should route away now");
  };

  return { index, pikaStyle, handleClick };
};
