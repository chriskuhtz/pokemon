const border = "3px solid black";

export const textBoxStyle = {
  display: "flex",
  alignItems: "stretch",
  width: "100%",
  padding: ".5rem",
};

export const leftHalfCircleStyle = {
  borderTop: border,
  borderBottom: border,
  borderLeft: border,
  borderBottomLeftRadius: "50%",
  borderTopLeftRadius: "50%",
  width: "2rem",
  backgroundColor: "white",
};
export const rightHalfCircleStyle = {
  borderTop: border,
  borderBottom: border,
  borderRight: border,
  borderBottomRightRadius: "50%",
  borderTopRightRadius: "50%",
  width: "2rem",
  backgroundColor: "white",
};

export const middleBoxStyle = (clickable: boolean) => {
  return {
    cursor: clickable ? "default" : "text",
    borderTop: border,
    borderBottom: border,
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "white",
  };
};
