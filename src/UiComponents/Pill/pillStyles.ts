import { thickBorder, thinBorder } from "../GlobalStyles/globalStyles";

export const pillStyle = {
  display: "flex",
  alignItems: "stretch",
  width: "100%",
};

export const leftHalfCircleStyle = (border?: "thick" | "thin") => {
  const correctBorder = border === "thin" ? thinBorder : thickBorder;
  return {
    borderTop: correctBorder,
    borderBottom: correctBorder,
    borderLeft: correctBorder,
    borderBottomLeftRadius: "50%",
    borderTopLeftRadius: "50%",
    width: "2rem",
    backgroundColor: "white",
  };
};
export const rightHalfCircleStyle = (border?: "thick" | "thin") => {
  const correctBorder = border === "thin" ? thinBorder : thickBorder;
  return {
    borderTop: correctBorder,
    borderBottom: correctBorder,
    borderRight: correctBorder,
    borderBottomRightRadius: "50%",
    borderTopRightRadius: "50%",
    width: "2rem",
    backgroundColor: "white",
  };
};

export const middleBoxStyle = (
  clickable: boolean,
  border?: "thick" | "thin"
) => {
  const correctBorder = border === "thin" ? thinBorder : thickBorder;
  return {
    cursor: clickable ? "default" : "text",
    borderTop: correctBorder,
    borderBottom: correctBorder,
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "white",
  };
};
