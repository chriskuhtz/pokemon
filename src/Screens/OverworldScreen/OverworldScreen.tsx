import { useEffect, useState } from "react";
import { absolutePosition } from "../../UiComponents/GlobalStyles/globalStyles";
import { MenuButton } from "./components/MenuButton/MenuButton";

const size = Math.min(
  Math.floor(window.innerWidth / 15),
  Math.floor(window.innerHeight / 9)
);

export interface MapField {
  texture: string;
}
export type Map = MapField[][];

const worldMapRow: MapField[] = [
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
  { texture: "field" },
];
const worldMap: Map = [
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
  worldMapRow,
];

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export const OverWorldScreen = (): JSX.Element => {
  const map = worldMap;
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 7,
    y: 4,
  });

  const [nextMovement, setNextMovement] = useState<Direction | undefined>(
    undefined
  );
  const [orientation, setOrientation] = useState<Direction>("DOWN");
  const [isButtonHeld, setIsButtonHeld] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);

  const isPlayerPosition = (x: number, y: number): boolean => {
    return x === position.x && y === position.y;
  };

  const move = (direction: Direction) => {
    if (direction === "UP" && position.y > 0) {
      setPosition({ ...position, y: position.y - 1 });
    }
    if (direction === "DOWN" && position.y < map.length - 1) {
      setPosition({ ...position, y: position.y + 1 });
    }
    if (direction === "LEFT" && position.x > 0) {
      setPosition({ ...position, x: position.x - 1 });
    }
    if (direction === "RIGHT" && position.x < map[position.y].length - 1) {
      setPosition({ ...position, x: position.x + 1 });
    }
  };

  useEffect(() => {
    if (!paused) {
      const movementInternal = setInterval(() => {
        console.log("tick", nextMovement, isButtonHeld);
        if (nextMovement !== undefined) {
          move(nextMovement);
        }

        setNextMovement(isButtonHeld ? nextMovement : undefined);
      }, 50);
      return () => {
        clearInterval(movementInternal);
      };
    }
  }, [nextMovement, setNextMovement, position, isButtonHeld, move, paused]);
  return (
    <>
      <MenuButton />
      <div
        style={{
          position: absolutePosition,
          zIndex: 2,
          right: 20,
          bottom: 20,
        }}
      >
        <button onClick={() => setPaused(!paused)}>
          {paused ? "Paused" : "Running"}
        </button>
        <button
          onMouseDown={() => {
            setNextMovement("UP");
            setIsButtonHeld(true);
          }}
          onMouseUp={() => setIsButtonHeld(false)}
        >
          Up
        </button>
        <button
          onMouseUp={() => setIsButtonHeld(false)}
          onMouseDown={() => {
            setNextMovement("LEFT");
            setIsButtonHeld(true);
          }}
        >
          Left
        </button>
        <button
          onMouseDown={() => {
            setNextMovement("DOWN");
            setIsButtonHeld(true);
          }}
          onMouseUp={() => setIsButtonHeld(false)}
        >
          Down
        </button>
        <button
          onMouseDown={() => {
            setNextMovement("RIGHT");
            setIsButtonHeld(true);
          }}
          onMouseUp={() => setIsButtonHeld(false)}
        >
          Right
        </button>
      </div>

      <div
        style={{
          overflow: "hidden",
          width: size * 15,
          height: size * 9,
          outline: "3px solid blue",
          position: absolutePosition,
          top: 0,
          left: 0,
        }}
        id={"viewport"}
      >
        <div
          style={{ backgroundColor: "darkgray", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: absolutePosition,
            top: (-position.y + 4) * size,
            left: (-position.x + 7) * size,
          }}
        >
          {worldMap.map((row, rowId) => (
            <div style={{ display: "flex" }} key={rowId}>
              {row.map((field, fieldId) => (
                <Field
                  fieldId={fieldId}
                  rowId={rowId}
                  key={fieldId}
                  highlighted={isPlayerPosition(fieldId, rowId)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Field = ({
  fieldId,
  rowId,
  highlighted,
}: {
  fieldId: number;
  rowId: number;
  highlighted: boolean;
}) => {
  return (
    <div
      style={{
        minHeight: `${size}px`,
        minWidth: `${size}px`,
        maxHeight: `${size}px`,
        maxWidth: `${size}px`,
        backgroundColor: highlighted ? "red" : "lightgreen",
        outline: "1px solid black",
      }}
    >
      {fieldId}/{rowId}
    </div>
  );
};
