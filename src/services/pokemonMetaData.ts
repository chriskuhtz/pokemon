// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonQueryResponse } from "../Interfaces/PokemonQueryResponse";

// Define a service using a base URL and expected endpoints
export const pokemonMetaDataApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonMetaDataByName: builder.query<PokemonQueryResponse, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonMetaDataByNameQuery } = pokemonMetaDataApi;
