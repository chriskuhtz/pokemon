import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Player } from "../Interfaces/Player";

export const playerApi = createApi({
  reducerPath: "playerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Player", "Players"],
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
  }),
});

export const {
  useGetPlayerQuery,
  useGetPlayersQuery,
  useUpdatePlayerMutation,
  useAddPlayerMutation,
} = playerApi;
