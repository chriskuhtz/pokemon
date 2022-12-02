import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { paragraphs } from "./introParagraphs";
import { pikachuStyle } from "./introStyle";

export const useIntro = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);

  const pikaStyle = useMemo(() => {
    return pikachuStyle(index);
  }, [index]);

  const handleClick = () => {
    const max = paragraphs.length - 1;

    if (index < max) {
      setIndex(index + 1);
    } else navigate(ROUTES.NAMESELECTION);
  };

  return { index, pikaStyle, handleClick };
};
