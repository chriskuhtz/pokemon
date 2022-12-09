import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMultiTextBox } from "../../../hooks/useMultiTextBox/useMultiTextBox";
import { ROUTES } from "../../../routes";
import { paragraphs } from "./introParagraphs";
import { pikachuStyle } from "./introStyle";

export const useIntro = () => {
  const navigate = useNavigate();

  const { index, handleClick } = useMultiTextBox(paragraphs, () =>
    navigate(ROUTES.NAMESELECTION)
  );

  const pikaStyle = useMemo(() => {
    return pikachuStyle(index);
  }, [index]);

  return { index, pikaStyle, handleClick };
};
