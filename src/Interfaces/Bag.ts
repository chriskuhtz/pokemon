export interface Item {
  name: string;
}

export interface ItemStack {
  item: Item;
  amount: number;
}

export interface Bag {
  id: number;
  items: ItemStack[];
}
