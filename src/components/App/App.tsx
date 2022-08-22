import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "../aboutUs/aboutUs";
import NotFound from "../notFound/notFound";
import MainPage from "../mainPage/MainPage";
import CardsFromForms from "../cardsFromForms/CardsFromForms";
import "./App.css";
import SearchParameters from "../SearchParameters/SearchParameters";
import BookDetailed from "../bookDetailed/BookDetailed";
import { TParametersAPI } from "../tools/interfaces";
import { useSelector } from "react-redux";
import { TStore } from "../../store/store";

function App() {
  const parametersState: TParametersAPI = useSelector(
    (state: TStore) => state.parameters
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="forms" element={<CardsFromForms />} />
        <Route path="searchParameters" element={<SearchParameters />} />
        <Route
          path="bookDetailed"
          element={<BookDetailed cardData={parametersState.currentBook} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
