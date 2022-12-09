import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Player } from "../Interfaces/Player";
import { Pokemon } from "../Interfaces/Pokemon";

export const internalApi = createApi({
  reducerPath: "internalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Player", "Players", "Pokemon"],
  endpoints: (builder) => ({
    getPlayers: builder.query<Player[], void>({
      query: () => `players`,
      providesTags: ["Players"],
    }),
    getPlayer: builder.query<Player, number>({
      query: (id) => `players/${id}`,
      providesTags: ["Player"],
    }),
    updatePlayer: builder.mutation<string, Player>({
      query: (player: Player) => ({
        url: `players/${player.id}`,
        method: "PUT",
        body: player,
      }),
      invalidatesTags: ["Player"],
    }),
    addPlayer: builder.mutation<string, Player>({
      query: (player: Player) => ({
        url: `players`,
        method: "POST",
        body: player,
      }),
      invalidatesTags: ["Players"],
    }),
    getPokemonById: builder.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
      providesTags: ["Pokemon"],
    }),
    getPokemonByOwnerId: builder.query<Pokemon[], number>({
      query: (id) => `pokemon/?ownerId=${id}`,
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
  useGetPlayerQuery,
  useGetPlayersQuery,
  useUpdatePlayerMutation,
  useAddPlayerMutation,
  useAddPokemonMutation,
  useGetPokemonByIdQuery,
  useGetPokemonByOwnerIdQuery,
  useUpdatePokemonMutation,
} = internalApi;
