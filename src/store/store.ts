import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { playerApi } from "../services/player";
import { pokemonApi } from "../services/pokemon";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [playerApi.reducerPath]: playerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        pokemonApi.middleware,
        playerApi.middleware,
      ]),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
