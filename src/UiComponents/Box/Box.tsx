import { ReactNode } from "react";
import { thickBorder, thinBorder } from "../GlobalStyles/globalStyles";

export const Box = ({
  children,
  border,
  onClick,
}: {
  children: ReactNode;
  border?: "thick" | "thin";
  onClick?: () => void;
}): JSX.Element => {
  const boxStyle = (border?: "thick" | "thin") => {
    const correctBorder =
      border === "thick"
        ? thickBorder
        : border === "thin"
        ? thinBorder
        : "none";
    return {
      border: correctBorder,
      padding: ".5rem",
      borderRadius: "1rem",
      height: "max-content",
      display: "flex",
      alignItems: "flex-start",
    };
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div onClick={handleClick} style={boxStyle(border)}>
      {children}
    </div>
  );
};
