import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";

export const PlayerMenu = ({}: {}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(ROUTES.POKEDEX)}>Pokedex</button>
      <button onClick={() => navigate(ROUTES.TRAINEROVERVIEW)}>
        Trainercard
      </button>
    </div>
  );
};
