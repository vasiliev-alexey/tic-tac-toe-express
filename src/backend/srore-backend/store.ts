import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();
import gameReducer from "./gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
