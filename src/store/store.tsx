import { configureStore } from "@reduxjs/toolkit";
import parametersAPISlice from "../features/parameters/parametersAPISlice";
import loaderSlice from "../features/loader/loaderSlice";
import userBooksSlice from "../features/userBooks/userBooksSlice";

export const store = configureStore({
  reducer: {
    parameters: parametersAPISlice,
    userBooks: userBooksSlice,
    loadedBooks: loaderSlice,
  },
});

export type TStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
