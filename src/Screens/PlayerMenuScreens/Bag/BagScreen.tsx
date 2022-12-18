import { BackButton } from "../../../Components/BackButton/BackButton";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { BagEntry } from "../../../Interfaces/Bag";
import { useGetBagQuery } from "../../../services/internal";
import { Container } from "../../../UiComponents/Container/Container";
import { LoadingScreen } from "../../LoadingScreen/LoadingScreen";
import { BagListItem } from "./components/BagListItem";

export const BagScreen = (): JSX.Element => {
  const currentId = getCurrentPlayerId();
  const { data } = useGetBagQuery(currentId);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <BackButton />
      {data.items.map((bagEntry: BagEntry) => (
        <BagListItem bagEntry={bagEntry} key={bagEntry.item.name} />
      ))}
    </Container>
  );
};
