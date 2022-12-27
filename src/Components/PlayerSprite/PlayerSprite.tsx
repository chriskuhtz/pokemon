import { playerSpriteStyle } from "./playerSpriteStyle";

export const PlayerSprite = ({
  id,
  onClick,
}: {
  id: number;
  onClick?: () => void;
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <img
      style={playerSpriteStyle}
      src={`/assets/playerSprites/${id}/Down.png`}
      alt={`playerSprite ${id}`}
      height="40px"
      onClick={handleClick}
    />
  );
};
