import React from "react";
import Navbar from "../NavbarComponent";
import Card from "../HomeCard";
import '../../scss/home.scss';
import '../../scss/app.scss';
import { data } from "../../data/homePage";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-cardsContainer">
        {data.map((x, i) => {
          return <Card key={i} {...x}/>
        })}
      </div>
    </div>
  );
}

export default Home;
