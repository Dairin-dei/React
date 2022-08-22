import { createSlice } from "@reduxjs/toolkit";
import { TUserBooks } from "../../components/tools/interfaces";

export const initialState: TUserBooks = {
  userBooks: [],
};

export const userBooksSlice = createSlice({
  name: "booksFromAPI",
  initialState,
  reducers: {
    setUserBooks: (state, action) => {
      const userBooks = [...state.userBooks, action.payload];
      return { ...state, userBooks: userBooks };
    },
  },
});

export const { setUserBooks } = userBooksSlice.actions;

export default userBooksSlice.reducer;
