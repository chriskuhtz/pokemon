import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "../Interfaces/Pokemon";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonById: builder.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
      providesTags: ["Pokemon"],
    }),
    updatePokemon: builder.mutation<void, Pokemon>({
      query: (pokemon: Pokemon) => ({
        url: `pokemon/${pokemon.id}`,
        method: "PUT",
        body: pokemon,
      }),
      invalidatesTags: ["Pokemon"],
    }),
    addPokemon: builder.mutation<void, Pokemon>({
      query: (pokemon: Pokemon) => ({
        url: `pokemon`,
        method: "POST",
        body: pokemon,
      }),
    }),
  }),
});

export const {
  useGetPokemonByIdQuery,
  useUpdatePokemonMutation,
  useAddPokemonMutation,
} = pokemonApi;
