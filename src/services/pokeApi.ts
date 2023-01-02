// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ItemQueryResponse } from "../Interfaces/ItemQueryResponse";
import { PokemonQueryResponse } from "../Interfaces/PokemonQueryResponse";

// Define a service using a base URL and expected endpoints
export const pokeApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonMetaDataByName: builder.query<PokemonQueryResponse, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonMetaDataById: builder.query<PokemonQueryResponse, number>({
      query: (id) => `pokemon/${id}`,
    }),
    getItemMetaDataByName: builder.query<ItemQueryResponse, string>({
      query: (name) => `item/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonMetaDataByNameQuery,
  useLazyGetPokemonMetaDataByIdQuery,
  useGetPokemonMetaDataByIdQuery,
  useGetItemMetaDataByNameQuery,
} = pokeApi;
