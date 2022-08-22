import { IBook } from "./interfaces";

export enum LOAD_STATUSES {
  apidataLoadInitial,
  apiDataLoadInProcess,
  apiDataLoadFinished,
  apiDataLoadFailed,
}

export const EMPTY_BOOK: IBook = {
  id: "",
  author: "",
  title: "",
  publishDate: "",
  publisher: "",
  cover: "",
  description: "",
  category: "",
  language: "",
};

export enum SORTING_METHOD {
  relevance,
  newest,
}

export const API_KEY = "AIzaSyD1RVkxNjj_q0zcGxJCeIiqRQ18xipjBmI";
