export interface Item {
  name: string;
}

export interface BagEntry {
  item: Item;
  amount: number;
}

export interface Bag {
  id: number;
  items: BagEntry[];
}
