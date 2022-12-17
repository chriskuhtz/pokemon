export const invisibleButtonStyle = (fullWidth?: boolean) => {
  return {
    width: fullWidth ? "100%" : "max-content",
    background: "none",
    border: "none",
    padding: "none",
  };
};
