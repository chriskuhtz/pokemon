export const ErrorScreen = ({ text }: { text?: string }) => {
  return <div>{text ?? "ERROR ERROR ERROR"}</div>;
};
