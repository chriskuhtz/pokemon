import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { internalApi } from "../services/internal";
import { mapApi } from "../services/map";
import { pokeApi } from "../services/pokeApi";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [pokeApi.reducerPath]: pokeApi.reducer,
      [mapApi.reducerPath]: mapApi.reducer,
      [internalApi.reducerPath]: internalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        pokeApi.middleware,
        internalApi.middleware,
        mapApi.middleware,
      ]),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
