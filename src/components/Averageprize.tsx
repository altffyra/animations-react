import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dataJson from "../assets/json_award.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
import gsap from "gsap";

type Props = {
  animation: string;
};

const Averageprize = (props: Props) => {
  const elemRef5 = React.useRef(
    "  "
  ) as unknown as React.MutableRefObject<HTMLInputElement>;
  const state2 = Flip.getState(".animGen5");

  function doFlip5() {
    elemRef5.current.classList.toggle("small");
    elemRef5.current.classList.toggle("big");
    elemRef5.current.classList.add("disabled");
    if (props.animation != "")
      Flip.from(state2, {
        duration: 1,
        ease: props.animation,
        absolute:true,
        prune:true,
        scale:true,
        simple:true
      });
    const divs = document.querySelectorAll(".buffer");
    divs.forEach((element) => {
      element.classList.add("disabled");
    });
    disabledTimer();
  }

  function disabledTimer() {
    setTimeout(() => {
      elemRef5.current.classList.remove("disabled");
      const divs = document.querySelectorAll(".buffer");
      divs.forEach((element) => {
        element.classList.remove("disabled");
      });
    }, 1500);
  }

  type prizeYear = {
    awardYear: string[];
    prizeAmount: number[];
    prizeAmountAdjusted: number[];
  };
  const awardYear: string[] = dataJson.map(
    (awardData: { awardYear: any }) => awardData.awardYear
  );
  const prizeAmount: number[] = dataJson.map(
    (awardData: { prizeAmount: any }) => awardData.prizeAmount
  );
  const prizeAmountAdjusted: number[] = dataJson.map(
    (awardData: { prizeAmountAdjusted: any }) => awardData.prizeAmountAdjusted
  );
  // const uniqueYears: string[] = [...new Set(awardYear)];

  const prizeYearData: prizeYear = {
    awardYear: awardYear,
    prizeAmount: prizeAmount,
    prizeAmountAdjusted: prizeAmountAdjusted,
  };

  const [prizeSum, setprizeSum] = useState(prizeYearData.prizeAmount);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 70
  },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Prize money / year",
      },
    },
  };

  const labels = prizeYearData.awardYear;
  const f = " f";
  const data = {
    labels,
    datasets: [
      {
        label: "Prize paid",
        data: prizeSum,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
      },
    ],
  };

  return (
    <div className="buffer">
      <div
        ref={elemRef5}
        onClick={() => doFlip5()}
        className={"small animGen5"}
      >
        <p>Prize Reward:</p>
        <div className="ptag" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setprizeSum(prizeYearData.prizeAmount)}>
            Prize given
          </button>
          <button
            onClick={() => setprizeSum(prizeYearData.prizeAmountAdjusted)}
          >
            Adjusted to inflation
          </button>
        </div>
        <Line height={300} options={options} data={data} />
      </div>
    </div>
  );
};

export default Averageprize;
