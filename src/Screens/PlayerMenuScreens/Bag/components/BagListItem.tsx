import { ItemStack } from "../../../../Interfaces/Bag";
import { useGetItemMetaDataByNameQuery } from "../../../../services/pokeApi";
import { Pill } from "../../../../UiComponents/Pill/Pill";

export const BagListItem = ({
  ItemStack,
}: {
  ItemStack: ItemStack;
}): JSX.Element => {
  const { data } = useGetItemMetaDataByNameQuery(
    ItemStack.item.name.toLowerCase()
  );

  if (!data) {
    return <></>;
  }

  return (
    <div style={{ paddingBottom: ".5rem" }}>
      <Pill>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <img alt={ItemStack.item.name} src={data.sprites.default} />
            <div>
              <strong>{data.name}</strong>
              <div>{data.flavor_text_entries[0].text}</div>
            </div>
          </div>

          <strong>{ItemStack.amount}</strong>
        </div>
      </Pill>
    </div>
  );
};
