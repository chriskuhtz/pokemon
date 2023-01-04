import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MapObject, type OverWorldMap } from "../Interfaces/Overworld";

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  tagTypes: [],
  endpoints: (builder) => ({
    getMap: builder.query<OverWorldMap, number>({
      query: (id) => `maps/${id}`,
      providesTags: [],
    }),
    getMapObject: builder.query<MapObject, number>({
      query: (id) => `objects/${id}`,
      providesTags: [],
    }),
  }),
});

export const {
  useGetMapQuery,
  useGetMapObjectQuery,
  useLazyGetMapObjectQuery,
} = mapApi;
