export const centerStyle = (horizontal?: boolean, vertical?: boolean) => {
  return {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: horizontal ? "center" : "flex-start",
    alignItems: vertical ? "center" : "flex-start",
  };
};
