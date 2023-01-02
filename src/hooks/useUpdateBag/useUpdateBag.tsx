import { useMemo } from "react";
import { getCurrentPlayerId } from "../../functions/handleCurrentPlayerId";
import { Bag, ItemStack } from "../../Interfaces/Bag";
import { useGetBagQuery, useUpdateBagMutation } from "../../services/internal";
import { Pill } from "../../UiComponents/Pill/Pill";
import { useCustomToast } from "../useCustomToast/useCustomToast";

export const useUpdateBag = () => {
  const currentId = useMemo(() => getCurrentPlayerId(), []);
  const { data: bag } = useGetBagQuery(currentId);
  const [updateBag] = useUpdateBagMutation();
  const { notify } = useCustomToast();

  const returnUpdatedBag = (newItems: ItemStack[]): Bag | void => {
    if (!bag) {
      console.error("could not load current bag");
      return;
    }
    const updatedBag = [...bag.items];
    newItems.forEach((newItemStack) => {
      const existingItemStackIndex = bag.items.findIndex(
        (stack: ItemStack) => stack.item.name === newItemStack.item.name
      );

      if (existingItemStackIndex === -1) {
        updatedBag.push(newItemStack);
      } else {
        const existingStack = newItems[existingItemStackIndex];
        const updatedAmount = existingStack.amount + newItemStack.amount;
        updatedBag[existingItemStackIndex] = {
          ...updatedBag[existingItemStackIndex],
          amount: updatedAmount,
        };
      }
    });
    return { ...bag, items: updatedBag };
  };

  const addItems = async (newItems: ItemStack[]) => {
    const updatedBag = await returnUpdatedBag(newItems);
    if (updatedBag) {
      await updateBag(updatedBag);
      newItems.forEach((itemStack) =>
        notify(
          <Pill>
            <>
              received {itemStack.amount} {itemStack.item.name}
            </>
          </Pill>
        )
      );
    }
  };
  return { addItems };
};
