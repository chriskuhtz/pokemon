export interface PokemonQueryResponse {
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string };
    };
  };
  id: number;
}
