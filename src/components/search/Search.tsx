import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSeekTitle } from "../../features/parameters/parametersAPISlice";
import { TStore } from "../../store/store";
import { TParametersAPI } from "../tools/interfaces";
import "./search.css";

interface IPropsCardsData {
  launchSearch: () => void;
}

function Search(props: IPropsCardsData) {
  const dispatch = useDispatch();
  const parametersState: TParametersAPI = useSelector(
    (state: TStore) => state.parameters
  );
  useEffect(() => {
    setSeekTitle(localStorage.getItem("searchText") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("searchText", parametersState.seekTitle);
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (parametersState.seekTitle) {
      if (event.key === "Enter") {
        props.launchSearch();
      }
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSeekTitle(event.target.value));
  };

  return (
    <div className="wrapper-search">
      <input
        name="textInput"
        type="search"
        value={parametersState.seekTitle}
        className="search"
        placeholder="Поиск"
        data-testid="search-input"
        onKeyDown={handleKeyDown}
        onChange={onChangeHandler}
      />
      <button
        className="button-search"
        onClick={() => {
          props.launchSearch();
        }}
      >
        Найти книгу
      </button>

      <Link className="link" to="/searchParameters">
        <button className="button-search-parameters"></button>
      </Link>
    </div>
  );
}
export default Search;
