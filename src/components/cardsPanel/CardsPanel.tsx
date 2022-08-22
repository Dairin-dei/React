import "./cardsPanel.css";
import { TLoadedBooksAPI } from "../tools/interfaces";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { TStore } from "../../store/store";

function CardsPanel() {
  const booksState: TLoadedBooksAPI = useSelector(
    (state: TStore) => state.loadedBooks
  );

  return (
    <>
      <section className="section-cards" data-testid="cards-panel">
        {booksState.booksFromAPI.map((card) => {
          return <Card key={card.id} cardData={card} />;
        })}
      </section>
    </>
  );
}

export default CardsPanel;
