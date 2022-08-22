import { IBookUser } from "../tools/interfaces";
import "./cardUser.css";

export interface IUserCardProps {
  cardData: IBookUser;
}

function CardUser(props: IUserCardProps) {
  return (
    <article className="card-user" data-testid="card-book">
      <div className="card__wrapper">
        {props.cardData.cover && (
          <img
            className="card__image"
            src={URL.createObjectURL(props.cardData.cover)}
            alt="book image"
            width="100"
            height="50"
          />
        )}
        <ul className="card__content" data-test-id="book">
          <li className="card__name">{`${props.cardData.title}`}</li>
          <li className="card__author">{`${props.cardData.author}`}</li>
          <li className="card__published">{`${props.cardData.publisher}, ${props.cardData.publishDate} г.`}</li>
          <li className="card__like-read">
            {props.cardData.read === 2 && (
              <img src="read-again.svg" alt="" title="Буду перечитывать" />
            )}
            {props.cardData.read === 1 && (
              <img
                src="read.png"
                alt=""
                title="Прочитано"
                width="40"
                height="40"
              />
            )}
            {props.cardData.like && (
              <img
                src="like.svg"
                alt=""
                width="40"
                height="40"
                title="Понравилось"
              />
            )}
          </li>
        </ul>
      </div>
    </article>
  );
}

export default CardUser;
