import { thickBorder } from "../Globals/globals";

export const textBoxStyle = {
  display: "flex",
  alignItems: "stretch",
  width: "100%",
  padding: ".5rem",
};

export const leftHalfCircleStyle = {
  borderTop: thickBorder,
  borderBottom: thickBorder,
  borderLeft: thickBorder,
  borderBottomLeftRadius: "50%",
  borderTopLeftRadius: "50%",
  width: "2rem",
  backgroundColor: "white",
};
export const rightHalfCircleStyle = {
  borderTop: thickBorder,
  borderBottom: thickBorder,
  borderRight: thickBorder,
  borderBottomRightRadius: "50%",
  borderTopRightRadius: "50%",
  width: "2rem",
  backgroundColor: "white",
};

export const middleBoxStyle = (clickable: boolean) => {
  return {
    cursor: clickable ? "default" : "text",
    borderTop: thickBorder,
    borderBottom: thickBorder,
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "white",
  };
};
