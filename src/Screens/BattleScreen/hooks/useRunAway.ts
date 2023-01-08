import { useNavigate } from "react-router-dom";
import { useCustomToast } from "../../../hooks/useCustomToast/useCustomToast";
import { ROUTES } from "../../../routes";

export const useRunAway = () => {
  const navigate = useNavigate();
  const { notify } = useCustomToast();

  const runAway = () => {
    notify("you ran away");
    navigate(ROUTES.OVERWORLD);
  };
  const tryToRunAway = () => {
    if (Math.random() < 0.3) {
      runAway();
      return;
    }
    console.log("couldnt run away");
  };

  return { tryToRunAway };
};
