import { BackButton } from "../../../Components/BackButton/BackButton";
import { getCurrentPlayerId } from "../../../functions/handleCurrentPlayerId";
import { ItemStack } from "../../../Interfaces/Bag";
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
      {data.items.map((ItemStack: ItemStack) => (
        <BagListItem ItemStack={ItemStack} key={ItemStack.item.name} />
      ))}
    </Container>
  );
};
