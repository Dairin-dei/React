import React from "react";
import Header from "../header/header";
import "./notFound.css";

class NotFound extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header page="404" />
        <main>
          <section className="section-notfound">
            <h2 className="h2">Здесь ничего нет</h2>
          </section>
        </main>
      </div>
    );
  }
}

export default NotFound;
