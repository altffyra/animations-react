import React, { useState } from "react";
import dataJson from "../assets/json_award.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
import gsap from "gsap";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  animation: string;
};
const CategoryForYear = (props: Props) => {
  const elemRef2 = React.useRef(
    ""
  ) as unknown as React.MutableRefObject<HTMLInputElement>;
  const state = Flip.getState(".animGen2");

  function doFlip2() {
    elemRef2.current.classList.toggle("small");
    elemRef2.current.classList.toggle("big");
    elemRef2.current.classList.add("disabled");
    if (props.animation != "")
      Flip.from(state, {
        duration: 1,
        ease: props.animation,
        absolute: true,
        scale:true,
        fade:true
      });
    const divs = document.querySelectorAll(".buffer");
    divs.forEach((element) => {
      element.classList.add("disabled");
    });
    disabledTimer();
  }

  function disabledTimer() {
    setTimeout(() => {
      elemRef2.current.classList.remove("disabled");
      const divs = document.querySelectorAll(".buffer");
      divs.forEach((element) => {
        element.classList.remove("disabled");
      });
    }, 1500);
  }

  const [size, setsize] = useState<boolean>(false);
  const sizeElem = size ? "big" : "small";
  const [chosenYear, setchosenYear] = useState<string>("2019");
  const yearFilter: any[] = dataJson.filter(
    (yeardata) => yeardata.awardYear == chosenYear
  );


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 60
  },
    plugins: {
      legend:{
        labels:{
          font:{
            size:0}
        }
      }
    },
  };
  let colors = [
    "#2dF35b",
    "#535b2d",
    "#494949",
    "#d7d7d7",
    "#Fadfce",
    "#Bad1ce",
  ];

  const labels = [
    yearFilter[0]?.category.en,
    yearFilter[1]?.category.en,
    yearFilter[2]?.category.en,
    yearFilter[3]?.category.en,
    yearFilter[4]?.category.en,
    yearFilter[5]?.category.en
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [
          yearFilter[0]?.laureates.length,
          yearFilter[1]?.laureates.length,
          yearFilter[2]?.laureates.length,
          yearFilter[3]?.laureates.length,
          yearFilter[4]?.laureates.length,
          yearFilter[5]?.laureates.length,
        ],
        backgroundColor: colors,
        events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
      },
    ],
  };

  return (
    <div className="buffer">
      <div
        ref={elemRef2}
        onClick={() => doFlip2()}
        className={"small animGen2"}
      >
        <p>Awards given year:</p>
        <input
          onClick={(e) => e.stopPropagation()}
          type="number"
          value={chosenYear}
          onChange={(e) => setchosenYear(e.target.value)}
        />
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default CategoryForYear;
