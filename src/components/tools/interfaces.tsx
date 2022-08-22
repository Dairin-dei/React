import { LOAD_STATUSES, SORTING_METHOD } from "./constants";

export interface IBook {
  id: string;
  author: string;
  title: string;
  publishDate: string;
  publisher: string;
  cover: string;
  description: string;
  category: string;
  language: string;
}

export interface IBookUser {
  id: string;
  author: string;
  title: string;
  publishDate: string;
  description: string;
  publisher: string;
  cover: Blob;
  read: number;
  like: boolean;
}

export type TParametersAPI = {
  pagination: number;
  pages: number;
  currentPage: number;
  sortingMethod: SORTING_METHOD;
  currentBook: IBook;
  seekTitle: string;
};

export type TLoadedBooksAPI = {
  loadStatus: LOAD_STATUSES;
  booksFromAPI: Array<IBook>;
};

export type TUserBooks = {
  userBooks: Array<IBookUser>;
};
