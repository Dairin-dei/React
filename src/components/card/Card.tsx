import { IBook } from "../tools/interfaces";
import "./card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentBook } from "../../features/parameters/parametersAPISlice";

export interface ICardProps {
  cardData: IBook;
}

function Card(props: ICardProps) {
  const dispatch = useDispatch();

  return (
    <Link className="link" to="/bookDetailed">
      <article
        className="card"
        data-testid="card-book"
        onClick={() => {
          dispatch(setCurrentBook(props.cardData));
        }}
      >
        <div className="card__wrapper">
          <img
            className="card__image"
            src={`${props.cardData.cover}`}
            alt="book image"
            width="100"
            height="50"
          />
          <ul className="card__content" data-test-id="book">
            <li className="card__name">
              {props.cardData.title ? props.cardData.title.slice(0, 40) : ""}
            </li>
            <li className="card__author">{props.cardData.author ?? ""}</li>
            <li className="card__published">
              {props.cardData.publisher ?? ""}
            </li>
            <li className="card__published">
              {props.cardData.publishDate ?? ""}
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}

export default Card;
