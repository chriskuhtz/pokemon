import { BackButton } from "../../../Components/BackButton/BackButton";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { ROUTES } from "../../../routes";
import { useGetPokedexQuery } from "../../../services/internal";
import { Box } from "../../../UiComponents/Box/Box";
import { Container } from "../../../UiComponents/Container/Container";
import { Center } from "../../../UiComponents/FlexBoxes/Center/Center";
import { LoadingScreen } from "../../LoadingScreen/LoadingScreen";
import { PokedexListItem } from "./components/PokedexListItem";

export const Pokedex = (): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data } = useGetPokedexQuery(currentId);

  if (!data) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <BackButton route={ROUTES.PLAYERMENU} />
      <Center>
        <div style={{ flexGrow: 3, overflow: "scroll", height: "92vh" }}>
          {data.seen.map((d: number) => (
            <PokedexListItem
              id={d}
              owned={data.owned.find((o) => o === d) ? true : false}
            />
          ))}
        </div>
        <div style={{ flexGrow: 2, paddingLeft: ".5rem" }}>
          <Box border={"thick"}>
            <div>
              <p>
                <strong>Seen:</strong> {data.seen.length}
              </p>
              <p>
                <strong>Owned:</strong> {data.owned.length}
              </p>
            </div>
          </Box>
        </div>
      </Center>
    </Container>
  );
};
