import Header from "../header/header";
import React from "react";
import "./aboutUs.css";

class AboutUs extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header page="О нас" />
        <main>
          <section className="section-about-us">
            <h2 className="h2">Здесь что-то будет...</h2>
          </section>
        </main>
      </div>
    );
  }
}

export default AboutUs;
