import { Player } from "../../Interfaces/Player";
import { PlayerSprite } from "../PlayerSprite/PlayerSprite";
import { outerBoxStyle, trainerImageStyle } from "./trainerCardStyle";

export const TrainerCard = ({ trainer }: { trainer: Player }) => {
  return (
    <div style={outerBoxStyle}>
      <div>
        <p>
          <strong>ID: </strong>
          {trainer.id}
        </p>
        <p>
          <strong>NAME: </strong>
          {trainer.name}
        </p>
        {trainer.money > 0 && (
          <p>
            <strong>MONEY: </strong>
            {trainer.money}
          </p>
        )}
      </div>

      {trainer.character && (
        <div style={trainerImageStyle}>
          <PlayerSprite id={trainer.character} />
        </div>
      )}
    </div>
  );
};
