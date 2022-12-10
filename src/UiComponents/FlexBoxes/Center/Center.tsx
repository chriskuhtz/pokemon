import { ReactElement, useMemo } from "react";
import { centerStyle } from "./centerStyle";

export const Center = ({
  children,
  horizontal,
  vertical,
}: {
  children: ReactElement;
  horizontal?: boolean;
  vertical?: boolean;
}) => {
  const style = useMemo(
    () => centerStyle(horizontal, vertical),
    [horizontal, vertical]
  );

  return <div style={style}>{children}</div>;
};
