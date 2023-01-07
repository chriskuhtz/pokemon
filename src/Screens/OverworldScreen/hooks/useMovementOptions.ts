import { useUpdatePlayerAttribute } from "../../../hooks/useUpdatePlayerAttribute/useUpdatePlayerAttribute";
import {
  EventLayerPortal,
  MovementDirection,
  Position,
} from "../../../Interfaces/Overworld";
import { PlayerLocation } from "../../../Interfaces/Player";
import { getNewPosition } from "../functions/getNewPosition";

export const useMovementOptions = (
  updatePlayerLocation: (x: PlayerLocation) => void,
  setMovementDirection: (x: MovementDirection | undefined) => void,
  isButtonHeld: boolean,
  playerLocation: PlayerLocation,
  movementDirection?: MovementDirection
) => {
  const { updatePlayerAttribute } = useUpdatePlayerAttribute();

  const changeDirection = (newOrientation: MovementDirection) => {
    updatePlayerLocation({
      ...playerLocation,
      playerOrientation: newOrientation,
    });
    setMovementDirection(isButtonHeld ? movementDirection : undefined);
  };
  const move = (newPosition: Position, newOrientation: MovementDirection) => {
    updatePlayerLocation({
      ...playerLocation,
      position: newPosition,
      playerOrientation: newOrientation,
    });
    setMovementDirection(isButtonHeld ? movementDirection : undefined);
  };
  const portal = (portal: EventLayerPortal) => {
    updatePlayerAttribute({ playerLocation: portal.to });
    setMovementDirection(isButtonHeld ? movementDirection : undefined);
  };
  const jumpLedge = (ledgePosition: Position, direction: MovementDirection) => {
    const positionAfterLedge = getNewPosition(ledgePosition, direction);
    updatePlayerLocation({
      ...playerLocation,
      position: positionAfterLedge,
    });
    setMovementDirection(isButtonHeld ? movementDirection : undefined);
  };

  return { move, changeDirection, portal, jumpLedge };
};
