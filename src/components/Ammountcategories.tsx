import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dataJson from "../assets/json_award.json";
import { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
import {Flip} from 'gsap/Flip'
gsap.registerPlugin(Flip);
import gsap from "gsap";


type Props = {
  animation:string
};

const Ammountcategories = (props: Props) => {
  const [size, setsize] = useState<boolean>(false);


  const elemRef = React.useRef(
    "cat"
  ) as unknown as React.MutableRefObject<HTMLInputElement>;
  const state = Flip.getState(".animGen1");

  function doFlip() {
    elemRef.current.classList.toggle("small");
    elemRef.current.classList.toggle("big");
    elemRef.current.classList.add("disabled");
    if(props.animation != "")
    Flip.from(state, {
      duration: 1,
      ease: props.animation,
      absolute: false,
    });
    const divs:NodeListOf<HTMLDivElement> = document.querySelectorAll(".buffer");
    divs.forEach(element => {
      element.classList.add("disabled");
    });
    disabledTimer();
  }

  function disabledTimer() {
    setTimeout(() => {
      elemRef.current.classList.remove("disabled");
      const divs:NodeListOf<HTMLDivElement> = document.querySelectorAll(".buffer");
      divs.forEach((element) => {
        element.classList.remove("disabled");
      });
    }, 1500);
  }






  const allcountries: string[] = dataJson.map((windata) => windata.category.en);
  const multiArray: string[] = [...new Set(allcountries)];
  let wins: any | number[] = {};
  multiArray.forEach((multiArr: any) => {
    wins[multiArr] = [];
    allcountries.forEach((winner) => {
      multiArr == winner ? wins[multiArr].push(winner) : null;
    });
  });
  const sizeElem = size ? "big" : "small";

  const orderedListNames5:string[] = Object.keys(wins).slice();


  const options = {
    responsive: true,
    maintainAspectRatio:false,
  };

  const data = {
    labels: [
      orderedListNames5[0],
      orderedListNames5[1],
      orderedListNames5[2],
      orderedListNames5[3],
      orderedListNames5[4],
      orderedListNames5[5],
    ],
    datasets: [
      {
        data: [
          wins[orderedListNames5[0]]?.length,
          wins[orderedListNames5[1]]?.length,
          wins[orderedListNames5[2]]?.length,
          wins[orderedListNames5[3]]?.length,
          wins[orderedListNames5[4]]?.length,
          wins[orderedListNames5[5]]?.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="buffer">
    <div ref={elemRef} onClick={() => doFlip()} className={"small animGen1"}>
      <p>Category has been awarded</p>
      <Pie  options={options} data={data}  />
    </div>
    </div>
  );
};

export default Ammountcategories;
