import { Direction } from "../../../../Interfaces/Overworld";
import { absolutePosition } from "../../../../UiComponents/GlobalStyles/globalStyles";
import { RoundButton } from "../../../../UiComponents/RoundButton/RoundButton";
import { size } from "../../OverworldScreen";

export const MovementAndActionButtons = ({
  handleActionButtonClick,
  setMovementDirection,
  setIsButtonHeld,
}: {
  handleActionButtonClick: () => void;
  setMovementDirection: (x: Direction) => void;
  setIsButtonHeld: (x: boolean) => void;
}): JSX.Element => {
  return (
    <>
      <div
        style={{
          position: absolutePosition,
          zIndex: 1000,
          left: `${20 + size}px`,
          bottom: `${20 + size}px`,
        }}
      >
        {" "}
        <RoundButton
          backgroundColor={"goldenrod"}
          size={size}
          onClick={handleActionButtonClick}
        >
          Action
        </RoundButton>
      </div>
      <div
        style={{
          position: absolutePosition,
          zIndex: 1000,
          right: `${20 + size}px`,
          bottom: `${20 + size * 2}px`,
        }}
      >
        <RoundButton
          color={"white"}
          backgroundColor={"darkslategray"}
          size={size}
          onMouseDown={() => {
            setMovementDirection("UP");
            setIsButtonHeld(true);
          }}
          onMouseUp={() => setIsButtonHeld(false)}
        >
          Up
        </RoundButton>
      </div>
      <div
        style={{
          position: absolutePosition,
          zIndex: 1000,
          right: `${20 + size * 2}px`,
          bottom: `${20 + size}px`,
        }}
      >
        <RoundButton
          color={"white"}
          backgroundColor={"darkslategray"}
          size={size}
          onMouseUp={() => setIsButtonHeld(false)}
          onMouseDown={() => {
            setMovementDirection("LEFT");
            setIsButtonHeld(true);
          }}
        >
          Left
        </RoundButton>{" "}
      </div>
      <div
        style={{
          position: absolutePosition,
          zIndex: 1000,
          right: `${20 + size}px`,
          bottom: `${20}px`,
        }}
      >
        <RoundButton
          color={"white"}
          backgroundColor={"darkslategray"}
          size={size}
          onMouseDown={() => {
            setMovementDirection("DOWN");
            setIsButtonHeld(true);
          }}
          onMouseUp={() => setIsButtonHeld(false)}
        >
          Down
        </RoundButton>{" "}
      </div>
      <div
        style={{
          position: absolutePosition,
          zIndex: 1000,
          right: `${20}px`,
          bottom: `${20 + size}px`,
        }}
      >
        <RoundButton
          color={"white"}
          backgroundColor={"darkslategray"}
          size={size}
          onMouseDown={() => {
            setMovementDirection("RIGHT");
            setIsButtonHeld(true);
          }}
          onMouseUp={() => setIsButtonHeld(false)}
        >
          Right
        </RoundButton>
      </div>
    </>
  );
};
