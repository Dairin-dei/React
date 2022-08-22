import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_BOOK, SORTING_METHOD } from "../../components/tools/constants";
import { TParametersAPI } from "../../components/tools/interfaces";

export const initialState: TParametersAPI = {
  pagination: 10,
  pages: 1,
  currentPage: 1,
  sortingMethod: SORTING_METHOD.relevance,
  currentBook: EMPTY_BOOK,
  seekTitle: "",
};

export const parametersAPISlice = createSlice({
  name: "parametersFromAPI",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      return { ...state, pagination: action.payload };
    },
    setPagesAmount: (state, action) => {
      return { ...state, pages: action.payload };
    },
    setCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
    setSortingMethod: (state, action) => {
      return { ...state, sortingMethod: action.payload };
    },
    setCurrentBook: (state, action) => {
      return { ...state, currentBook: action.payload };
    },
    setSeekTitle: (state, action) => {
      return { ...state, seekTitle: action.payload };
    },
  },
});

export const {
  setPagination,
  setPagesAmount,
  setCurrentPage,
  setSortingMethod,
  setCurrentBook,
  setSeekTitle,
} = parametersAPISlice.actions;

export default parametersAPISlice.reducer;
