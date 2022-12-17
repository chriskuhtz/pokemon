import { Pokemon } from "./Pokemon";

export interface PCStorage {
  id: number;
  pokemon: Pokemon[] | [];
}
