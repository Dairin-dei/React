import React from "react";
import Form from "../form/Form";
import { TUserBooks } from "../tools/interfaces";
import CardUser from "../cardUser/CardUser";
import Header from "../header/header";
import "./cardsFromForms.css";
import { useSelector } from "react-redux";
import { TStore } from "../../store/store";

function CardsFromForms() {
  const userBooksState: TUserBooks = useSelector(
    (state: TStore) => state.userBooks
  );
  return (
    <>
      <div className="main-page">
        <Header page="Добавление книги в коллекцию" />
        <Form />;
        <section className="section-cards" data-testid="cards-panel">
          {userBooksState.userBooks.map((card, idx) => {
            return <CardUser key={idx} cardData={card} />;
          })}
        </section>
      </div>
    </>
  );
}

export default CardsFromForms;
