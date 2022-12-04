import { flexDirectionColumn } from "../GlobalStyles/globalStyles";

export const outerBoxStyle = (justifyContent: "flex-end" | "space-between") => {
  return {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: flexDirectionColumn,
    justifyContent: justifyContent,
  };
};

export const bottomContentStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const mainContentStyle = {
  width: "100%",
};
