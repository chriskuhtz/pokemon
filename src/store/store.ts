import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { internalApi } from "../services/internal";
import { pokemonMetaDataApi } from "../services/pokemonMetaData";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [pokemonMetaDataApi.reducerPath]: pokemonMetaDataApi.reducer,
      [internalApi.reducerPath]: internalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        pokemonMetaDataApi.middleware,
        internalApi.middleware,
      ]),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
