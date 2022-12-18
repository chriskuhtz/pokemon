import { Team } from "../../Interfaces/Team";
import { Box } from "../../UiComponents/Box/Box";
import { EmptyMemberSlot } from "./components/EmptyMemberSlot";
import { TeamMemberOverview } from "./components/TeamMemberOverview";

export const TeamOverview = ({ team }: { team: Team }): JSX.Element => {
  return (
    <Box border={"thick"}>
      <div style={{ padding: ".5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {team.pokemon[0] ? (
            <TeamMemberOverview pokemon={team.pokemon[0]} />
          ) : (
            <EmptyMemberSlot />
          )}
          {team.pokemon[1] ? (
            <TeamMemberOverview pokemon={team.pokemon[1]} />
          ) : (
            <EmptyMemberSlot />
          )}
          {team.pokemon[2] ? (
            <TeamMemberOverview pokemon={team.pokemon[2]} />
          ) : (
            <EmptyMemberSlot />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1rem",
          }}
        >
          {team.pokemon[3] ? (
            <TeamMemberOverview pokemon={team.pokemon[3]} />
          ) : (
            <EmptyMemberSlot />
          )}
          {team.pokemon[4] ? (
            <TeamMemberOverview pokemon={team.pokemon[4]} />
          ) : (
            <EmptyMemberSlot />
          )}
          {team.pokemon[5] ? (
            <TeamMemberOverview pokemon={team.pokemon[5]} />
          ) : (
            <EmptyMemberSlot />
          )}
        </div>
      </div>
    </Box>
  );
};
