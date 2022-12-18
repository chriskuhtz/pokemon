import { ReactNode } from "react";

export const Container = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <div
      style={{
        padding: ".5rem",
        width: "calc(100%- 1rem)",
      }}
    >
      {children}
    </div>
  );
};
