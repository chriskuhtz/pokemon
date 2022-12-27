export const ErrorScreen = ({ text }: { text?: string }) => {
  return (
    <div style={{ backgroundColor: "black", color: "antiquewhite" }}>
      {text ?? "ERROR ERROR ERROR"}
    </div>
  );
};
