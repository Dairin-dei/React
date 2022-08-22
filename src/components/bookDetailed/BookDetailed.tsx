import React from "react";
import Header from "../header/header";
import { IBook } from "../tools/interfaces";
import "./bookDetailed.css";

interface IProps {
  cardData: IBook;
}

class BookDetailed extends React.Component<IProps> {
  render() {
    return (
      <div className="wrapper vertical">
        <Header page="Подробно об издании" />
        <main>
          <div className="wrapper outside">
            <article className="modal__book">
              <div className="wrapper inside">
                <img
                  className="modal__book-image"
                  src={this.props.cardData.cover}
                  alt={`${this.props.cardData.title} image`}
                />
                <ul className="modal__book-content" data-test-id="book">
                  <li>
                    <p className="modal__header">Информация о книге</p>
                  </li>
                  <li className="modal__book-name">
                    {this.props.cardData.title}
                  </li>
                  <li className="modal__book-author">
                    {this.props.cardData.author}
                  </li>
                  <li className="modal__book-published">
                    {this.props.cardData.publisher}
                  </li>
                  <li className="modal__book-published">
                    {this.props.cardData.publishDate}
                  </li>
                  <li className="modal__book-published">
                    {this.props.cardData.language}
                  </li>
                  <li className="modal__book-published">
                    {this.props.cardData.category ?? ""}
                  </li>
                </ul>
              </div>
            </article>
            <article className="modal__description">
              <span className="modal__book-annotation">
                {this.props.cardData.description}
              </span>
            </article>
          </div>
        </main>
      </div>
    );
  }
}

export default BookDetailed;
