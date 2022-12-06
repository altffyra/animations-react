import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import Ammountcategories from "./Categories";
import Averageprize from "./Averageprize";
import Genderwins from "./Genderwins";
import CategoryForYear from "./CategoryForYear";
import coin from "../assets/coin.jpeg";
import fbook from "../assets/facebookLogo.png";
import insta from "../assets/instaLogo.png";
import twitter from "../assets/twitterLogo.png";
import spring from "../assets/spring.png";
import bounce from "../assets/bounce.png";
import line from "../assets/linear.png";
import noani from "../assets/noAni.png";
import steps from "../assets/steps.png";
import backout from "../assets/backout.png";
import heavy from "../assets/heavy.png";
import gsap from "gsap";

type Props = {};

const Main = (props: Props) => {
  const flip = useRef();
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".flip", { rotation: 360 });
    });
    return () => ctx.revert();
  }, []);

  const [animation, setAnimation] = useState<string>("");
  const aniLineActive = animation == "none" ? "active" : "";
  const aniBounceActive = animation == "bounce.out" ? "active" : "";
  const aniSpringActive = animation == "elastic" ? "active" : "";
  const aniNoneActive = animation == "" ? "active" : " ";
  const stepsActive = animation == "steps(6)" ? "active" : " ";
  const backActive = animation == "back.out(30)" ? "active" : "";
  const heavyActive = animation == "power2.in" ? "active" : "";

  return (
    <div className="main">
      <div
        className={"aniHeavy flip " + heavyActive}
        onClick={() => setAnimation("power2.in")}
      >
        <img src={heavy}></img>
      </div>

      <div
        className={"aniBack flip " + backActive}
        onClick={() => setAnimation("back.out(30)")}
      >
        <img src={backout}></img>
      </div>

      <div
        className={"aniSteps flip " + stepsActive}
        onClick={() => setAnimation("steps(6)")}
      >
        <img src={steps}></img>
      </div>

      <div
        className={"aniNone flip " + aniNoneActive}
        onClick={() => setAnimation("")}
      >
        <img src={noani}></img>
      </div>
      <div
        className={"aniLinear flip " + aniLineActive}
        onClick={() => setAnimation("none")}
      >
        <img src={line}></img>
      </div>
      <div
        className={"aniBounce flip " + aniBounceActive}
        onClick={() => setAnimation("bounce.out")}
      >
        <img src={bounce}></img>
      </div>
      <div
        className={"aniSpring flip " + aniSpringActive}
        onClick={() => setAnimation("elastic")}
      >
        <img src={spring}></img>
      </div>
      <div className="header">
        <img className="coinIcon" src={coin} alt="Alfred Nobels coin" />
        <h1 className="title flip">
          Alfred Nobels prize nominations throughtout the years
          <p className="additionalTitle">Charts all the way from the start</p>
        </h1>
      </div>

      <div className="allContent">
        <Averageprize animation={animation} />
        <Ammountcategories animation={animation} />
        <CategoryForYear animation={animation} />
        <Genderwins animation={animation} />
      </div>

      <div className="socials">
        <img className="icon" src={fbook} alt="facebook logo" />
        <img className="icon" src={insta} alt="instagram logo" />
        <img className="icon" src={twitter} alt="twitter logo" />
      </div>
    </div>
  );
};

export default Main;
