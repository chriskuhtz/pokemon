import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bag } from "../Interfaces/Bag";
import { PCStorage } from "../Interfaces/PCStorage";
import { Player } from "../Interfaces/Player";
import { Pokedex } from "../Interfaces/Pokedex";
import { Team } from "../Interfaces/Team";

export const internalApi = createApi({
  reducerPath: "internalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: [
    "Player",
    "Players",
    "Team",
    "Teams",
    "PCStorage",
    "Pokedex",
    "Bag",
  ],
  endpoints: (builder) => ({
    //PLAYER
    getPlayers: builder.query<Player[], void>({
      query: () => `players`,
      providesTags: ["Players"],
    }),
    getPlayer: builder.query<Player, number>({
      query: (id) => `players/${id}`,
      providesTags: ["Player"],
    }),
    updatePlayer: builder.mutation<void, Player>({
      query: (player: Player) => ({
        url: `players/${player.id}`,
        method: "PUT",
        body: player,
      }),
      invalidatesTags: ["Player"],
    }),
    addPlayer: builder.mutation<void, Player>({
      query: (player: Player) => ({
        url: `players`,
        method: "POST",
        body: player,
      }),
      invalidatesTags: ["Players"],
    }),
    //TEAM
    getTeam: builder.query<Team, number>({
      query: (id) => `teams/${id}`,
      providesTags: ["Team"],
    }),
    updateTeam: builder.mutation<void, Team>({
      query: (team: Team) => ({
        url: `teams/${team.id}`,
        method: "PUT",
        body: team,
      }),
      invalidatesTags: ["Team"],
    }),
    createNewTeam: builder.mutation<void, Team>({
      query: (team: Team) => ({
        url: `teams`,
        method: "POST",
        body: team,
      }),
    }),
    //STORAGE
    getPCStorage: builder.query<PCStorage, number>({
      query: (id) => `pcstorages/${id}`,
      providesTags: ["Team"],
    }),
    updatePCStorage: builder.mutation<void, PCStorage>({
      query: (pcStorage: PCStorage) => ({
        url: `pcstorages/${pcStorage.id}`,
        method: "PUT",
        body: pcStorage,
      }),
      invalidatesTags: ["PCStorage"],
    }),
    createNewPCStorage: builder.mutation<void, PCStorage>({
      query: (pcStorage: PCStorage) => ({
        url: `pcstorages`,
        method: "POST",
        body: pcStorage,
      }),
    }),
    //POKEDEX
    getPokedex: builder.query<Pokedex, number>({
      query: (id) => `pokedexes/${id}`,
      providesTags: ["Pokedex"],
    }),
    updatePokedex: builder.mutation<void, Pokedex>({
      query: (pokedex: Pokedex) => ({
        url: `pokedexes/${pokedex.id}`,
        method: "PUT",
        body: pokedex,
      }),
      invalidatesTags: ["Pokedex"],
    }),
    createNewPokedex: builder.mutation<void, Pokedex>({
      query: (pokedex: Pokedex) => ({
        url: `pokedexes`,
        method: "POST",
        body: pokedex,
      }),
    }),
    //BAG
    getBag: builder.query<Bag, number>({
      query: (id) => `bags/${id}`,
      providesTags: ["Bag"],
    }),
    updateBag: builder.mutation<void, Bag>({
      query: (bag: Bag) => ({
        url: `bags/${bag.id}`,
        method: "PUT",
        body: bag,
      }),
      invalidatesTags: ["Bag"],
    }),
    createNewBag: builder.mutation<void, Bag>({
      query: (bag: Bag) => ({
        url: `bags`,
        method: "POST",
        body: bag,
      }),
    }),
  }),
});

export const {
  useGetPlayerQuery,
  useGetPlayersQuery,
  useUpdatePlayerMutation,
  useAddPlayerMutation,
  useCreateNewPokedexMutation,
  useCreateNewTeamMutation,
  useGetPokedexQuery,
  useGetTeamQuery,
  useUpdatePokedexMutation,
  useUpdateTeamMutation,
  useCreateNewPCStorageMutation,
  useGetPCStorageQuery,
  useUpdatePCStorageMutation,
  useCreateNewBagMutation,
  useGetBagQuery,
  useUpdateBagMutation,
} = internalApi;
