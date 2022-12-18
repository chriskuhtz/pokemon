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
  width: "calc(100%-1rem)",
  display: "flex",
  justifyContent: "center",
  padding: "0.5rem 0.5rem",
};

export const mainContentStyle = {
  width: "calc(100%-1rem)",
  padding: "0.5rem 0.5rem",
};
