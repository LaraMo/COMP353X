import React from "react";
import Card from "../components/HomeCard";
import {data} from '../data/homePage.js'
function Home() {
  return (
    <div className="home">
      <div className="home-cardsContainer">
        {data.map((x, i) => {
          return <Card key={i} {...x}/>
        })}
      </div>
    </div>
  );
}

export default Home;
