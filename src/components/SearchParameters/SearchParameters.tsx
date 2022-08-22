import React from "react";
import "./searchParameters.css";
import { SORTING_METHOD } from "../tools/constants";
import Header from "../header/header";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPagesAmount,
  setPagination,
  setSortingMethod,
} from "../../features/parameters/parametersAPISlice";
import { TStore } from "../../store/store";
import { TParametersAPI } from "../tools/interfaces";

function SearchParameters() {
  const parametersState: TParametersAPI = useSelector(
    (state: TStore) => state.parameters
  );
  const dispatch = useDispatch();

  const handleOnChangeSortingMethod = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value === String(SORTING_METHOD.relevance)
      ? dispatch(setSortingMethod(SORTING_METHOD.relevance))
      : dispatch(setSortingMethod(SORTING_METHOD.newest));
  };

  const handleOnChangePagination = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPagination(Number(event.target.value)));
  };

  const handleOnChangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPagesAmount(Number(event.target.value)));
  };

  const handleOnChangeCurrentPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setCurrentPage(Number(event.target.value)));
  };

  return (
    <div className="wrapper-out-search-parameters">
      <Header page="Настройки поиска" />
      <main>
        <div className="wrapper-search-parameters">
          <label className="search__sort-label">
            Сортировка
            <label className="radio">
              <input
                type="radio"
                value={String(SORTING_METHOD.relevance)}
                onChange={handleOnChangeSortingMethod}
                checked={
                  parametersState.sortingMethod === SORTING_METHOD.relevance
                }
              />
              <div className="radio__text">по соответствию</div>
            </label>
            <label className="radio">
              <input
                type="radio"
                value={String(SORTING_METHOD.newest)}
                onChange={handleOnChangeSortingMethod}
                checked={
                  parametersState.sortingMethod === SORTING_METHOD.newest
                }
              />
              <div className="radio__text">по новизне</div>
            </label>
          </label>
          <div className="wrapper-vertical">
            <label>
              <input
                type="number"
                name=""
                id=""
                value={parametersState.pagination}
                onChange={handleOnChangePagination}
              />
              {`    записей на странице`}
            </label>
            <label>
              <input
                type="number"
                min="1"
                value={parametersState.pages}
                onChange={handleOnChangePage}
              />
              {`    всего страниц`}
            </label>
            <label>
              {`перейти на страницу    `}
              <input
                type="number"
                min="1"
                value={parametersState.currentPage}
                onChange={handleOnChangeCurrentPage}
              />
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchParameters;
