import { absolutePosition } from "../../UiComponents/GlobalStyles/globalStyles";
import { size } from "./OverworldScreen";

export const viewPortStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
  position: absolutePosition,
  top: 0,
  left: 0,
};
export const backgroundStyle = {
  backgroundColor: "black",
  width: "100%",
  height: "100%",
};
export const backgroundLayerStyle = (x: number, y: number) => {
  return {
    position: absolutePosition,
    top: (-y + 4) * size,
    left: (-x + 7) * size,
  };
};
