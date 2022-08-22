import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  API_KEY,
  LOAD_STATUSES,
  SORTING_METHOD,
} from "../../components/tools/constants";
import {
  IBook,
  TParametersAPI,
  TLoadedBooksAPI,
} from "../../components/tools/interfaces";

type ArrayBook = Array<IBook>;

export const getCardsFromAPI = createAsyncThunk(
  "loader/getCardsFromAPI",
  async (parametersAPI: TParametersAPI) => {
    let startResult = 0;
    const sortingMethod = parametersAPI.sortingMethod;
    const currentPage =
      parametersAPI.currentPage < 1 ? 1 : parametersAPI.currentPage;
    const pagination =
      parametersAPI.pagination < 1 ? 1 : parametersAPI.pagination;
    if (currentPage > 1) {
      startResult = (currentPage - 1) * pagination;
    }
    const sort =
      sortingMethod === SORTING_METHOD.relevance ? "relevance" : "newest";

    const booksIds: ArrayBook = [];
    try {
      booksIds.length = 0;
      const booksData = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:"${parametersAPI.seekTitle}"&orderBy=${sort}&projection=full&key=${API_KEY}&startIndex=${startResult}&maxResults=${pagination}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const resArray = await booksData.json();

      for (let i = 0; i < Math.min(40, resArray.items.length); i += 1) {
        const bookBasic = resArray.items[i];
        const bookAdvanced = resArray.items[i].volumeInfo;
        const book: IBook = {
          id: bookBasic.id + bookBasic.etag,
          author: bookAdvanced.authors?.join(", ") ?? "",
          title: bookAdvanced.title,
          publishDate: bookAdvanced.publishedDate ?? "",
          publisher: bookAdvanced.publisher ?? "",
          cover: bookAdvanced.imageLinks?.thumbnail ?? "",
          description: bookAdvanced.description ?? "",
          category: bookAdvanced.categories?.join(", ") ?? "",
          language: bookAdvanced.language ?? "",
        };

        booksIds.push(book);
      }
    } catch (err) {
      throw err;
    }
    return booksIds;
  }
);

const initialState: TLoadedBooksAPI = {
  loadStatus: LOAD_STATUSES.apidataLoadInitial,
  booksFromAPI: [],
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return { ...state, loadStatus: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsFromAPI.pending, (state) => {
        state.loadStatus = LOAD_STATUSES.apiDataLoadInProcess;
      })
      .addCase(getCardsFromAPI.fulfilled, (state, action) => {
        state.booksFromAPI = action.payload;
        state.loadStatus = LOAD_STATUSES.apiDataLoadFinished;
      })
      .addCase(getCardsFromAPI.rejected, (state) => {
        state.loadStatus = LOAD_STATUSES.apiDataLoadFailed;
      });
  },
});

export const { setStatus } = loaderSlice.actions;

export default loaderSlice.reducer;
