import React from "react";
import Ammountcategories from "./Ammountcategories";
import Averageprize from "./Averageprize";
import Genderwins from "./Genderwins";
import CategoryForYear from "./CategoryForYear";
import coin from "../assets/coin.jpeg"
import fbook from "../assets/facebookLogo.png"
import insta from "../assets/instaLogo.png"
import twitter from "../assets/twitterLogo.png"


type Props = {};

const Main = (props: Props) => {

    


  return (
    <div className="main">
      <div className="aniBounce"></div>
      <div className="aniLinear"></div>
      <div className="header">
        <img
          className="coinIcon"
          src={coin}
          alt="Alfred Nobels coin"
        />
        <h1 className="title">
          Alfred Nobels pristagare genom historien
          <p className="additionalTitle">Diagram med data från starten.</p>
        </h1>
      </div>

      <div className="allContent">
        <Averageprize />
        <CategoryForYear />
        <Ammountcategories />
        <Genderwins />
      </div>

      <div className="socials">
        <img
          className="icon"
          src={fbook}
          alt="facebook logo"
        />
        <img
          className="icon"
          src={insta}
          alt="instagram logo"
        />
        <img
          className="icon"
          src={twitter}
          alt="twitter logo"
        />
      </div>
    </div>
  );
};

export default Main;
