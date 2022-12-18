import { ReactNode, useState } from "react";
import { absolutePosition } from "../../UiComponents/GlobalStyles/globalStyles";
import { Pill } from "../../UiComponents/Pill/Pill";

export const Alert = ({ children }: { children: ReactNode }): JSX.Element => {
  const [display, setDisplay] = useState<boolean>(true);

  setTimeout(() => {
    setDisplay(false);
  }, 3000);

  const notificationStyle = {
    position: absolutePosition,
    top: "1rem",
    right: "1rem",
  };

  if (!display) {
    return <></>;
  }
  return (
    <div style={notificationStyle}>
      <Pill>{children}</Pill>
    </div>
  );
};
