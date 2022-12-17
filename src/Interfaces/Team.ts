import { Pokemon } from "./Pokemon";

export interface Team {
  id: number;
  pokemon: Pokemon[] | [];
}
