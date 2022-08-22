import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

interface IHeaderProps {
  page: string;
}

class Header extends React.Component<IHeaderProps> {
  render() {
    return (
      <header className="header">
        <ul className="nav">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/forms" data-testid="link-forms">
              Формы
            </Link>
          </li>
          <li>
            <Link to="/aboutUs" data-testid="link-about">
              О нас
            </Link>
          </li>
        </ul>
        <h1 className="h1">{this.props.page}</h1>
      </header>
    );
  }
}

export default Header;
