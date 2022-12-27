import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getCurrentPlayerId } from "../../../../functions/handleCurrentPlayerId";
import { PlayerLocation } from "../../../../Interfaces/Player";
import { ROUTES } from "../../../../routes";
import {
  useGetPlayerQuery,
  useUpdatePlayerMutation,
} from "../../../../services/internal";
import { RoundButton } from "../../../../UiComponents/RoundButton/RoundButton";
import { ErrorScreen } from "../../../ErrorScreen/ErrorScreen";
import { menuButtonStyle } from "./menuButtonStyle";

export const MenuButton = ({
  playerLocation,
}: {
  playerLocation: PlayerLocation;
}): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data: player } = useGetPlayerQuery(currentId);
  const [updatePlayer] = useUpdatePlayerMutation();
  const navigate = useNavigate();

  if (!player) {
    return <ErrorScreen />;
  }
  return (
    <div style={menuButtonStyle}>
      <RoundButton
        onClick={() => {
          updatePlayer({ ...player, playerLocation: playerLocation });
          navigate(ROUTES.PLAYERMENU);
        }}
        backgroundColor={"green"}
      >
        <BiMenu size={"large"} />
      </RoundButton>
    </div>
  );
};
