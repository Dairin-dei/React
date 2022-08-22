import { useEffect } from "react";
import Header from "../header/header";
import Search from "../search/Search";
import CardsPanel from "../cardsPanel/CardsPanel";
import "./mainPage.css";
import { TLoadedBooksAPI, TParametersAPI } from "../tools/interfaces";
import { LOAD_STATUSES } from "../tools/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, TStore } from "../../store/store";
import { getCardsFromAPI, setStatus } from "../../features/loader/loaderSlice";

function MainPage() {
  const parametersState: TParametersAPI = useSelector(
    (state: TStore) => state.parameters
  );
  const dispatch: AppDispatch = useDispatch();
  const booksState: TLoadedBooksAPI = useSelector(
    (state: TStore) => state.loadedBooks
  );
  useEffect(() => {
    setStatus(LOAD_STATUSES.apidataLoadInitial);
    if (booksState.booksFromAPI.length) {
      setStatus(LOAD_STATUSES.apiDataLoadFinished);
    }
  }, []);

  async function launchSearch() {
    await dispatch(getCardsFromAPI(parametersState));
  }

  return (
    <div className="main-page">
      <Header page="Главная страница: поиск книг" />
      <Search launchSearch={launchSearch} />
      <main>
        {booksState.loadStatus === LOAD_STATUSES.apiDataLoadFailed && (
          <p className="no-data">
            К сожалению, книг по вашему запросу не нашлось
          </p>
        )}
        {booksState.loadStatus === LOAD_STATUSES.apiDataLoadFinished && (
          <CardsPanel />
        )}
        {booksState.loadStatus === LOAD_STATUSES.apiDataLoadInProcess && (
          <img className="main-loading" src="./spinner.gif" alt="Загрузка" />
        )}
      </main>
    </div>
  );
}

export default MainPage;
