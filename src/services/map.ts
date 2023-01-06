import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type OverWorldMap } from "../Interfaces/Overworld";

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  tagTypes: [],
  endpoints: (builder) => ({
    getMap: builder.query<OverWorldMap, number>({
      query: (id) => `maps/${id}`,
      providesTags: [],
    }),
  }),
});

export const { useGetMapQuery } = mapApi;
