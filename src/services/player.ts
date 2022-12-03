import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Player } from "../Interfaces/Player";

export const playerApi = createApi({
  reducerPath: "playerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Player"],
  endpoints: (builder) => ({
    getPlayer: builder.query<Player, void>({
      query: () => `player`,
      providesTags: ["Player"],
    }),

    updatePlayer: builder.mutation<string, Player>({
      query: (player: Player) => ({
        url: `player`,
        method: "PUT",
        body: player,
      }),
      invalidatesTags: ["Player"],
    }),
  }),
});

export const { useGetPlayerQuery, useUpdatePlayerMutation } = playerApi;
