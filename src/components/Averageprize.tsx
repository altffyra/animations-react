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
import { ChartProps, Line } from "react-chartjs-2";
import Json from "../assets/json_award.json";

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

  //// GSAP ANIMATIONS
  const elemRef5 =
    React.useRef() as unknown as React.MutableRefObject<HTMLInputElement>;
  const state2 = Flip.getState(".animGen5");

  function doFlip5(): void {
    elemRef5.current.classList.toggle("small");
    elemRef5.current.classList.toggle("big");
    elemRef5.current.classList.add("disabled");
    if (props.animation != "")
      Flip.from(state2, {
        duration: 1,
        ease: props.animation,
        absolute: true,
        prune: true,
        scale: true,
        simple: true,
      });
    const divs: NodeListOf<Element> = document.querySelectorAll(".buffer");
    divs.forEach((element) => {
      element.classList.add("disabled");
    });
    disabledTimer();
  }

  function disabledTimer(): void {
    setTimeout((): void => {
      elemRef5.current.classList.remove("disabled");
      const divs: NodeListOf<Element> = document.querySelectorAll(".buffer");
      divs.forEach((element) => {
        element.classList.remove("disabled");
      });
    }, 1000);
  }

  /// CHART JS CALC

  type prizeForYear = {
    awardYear: string[];
    prizeAmount: number[];
    prizeAmountAdjusted: number[];
  };
  const awardYear: string[] = Json.map(
    (selectedData: { awardYear: any }) => selectedData.awardYear
  );
  const prizeAmount: number[] = Json.map(
    (selectedData: { prizeAmount: any }) => selectedData.prizeAmount
  );
  const prizeAmountAdjusted: number[] = Json.map(
    (selectedData: { prizeAmountAdjusted: any }) =>
      selectedData.prizeAmountAdjusted
  );

  const YearData: prizeForYear = {
    awardYear: awardYear,
    prizeAmount: prizeAmount,
    prizeAmountAdjusted: prizeAmountAdjusted,
  };

  const [prizeSum, setprizeSum] = useState<number[]>(YearData.prizeAmount);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 70,
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

  const labels: string[] = YearData.awardYear;
  const data = {
    labels,
    datasets: [
      {
        label: "Prize paid",
        data: prizeSum,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        events: ["mousemove", "mouseout", "touchstart", "touchmove"],
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
          <button onClick={() => setprizeSum(YearData.prizeAmount)}>
            Prize given
          </button>
          <button onClick={() => setprizeSum(YearData.prizeAmountAdjusted)}>
            Adjusted to inflation
          </button>
        </div>
        <Line height={300} options={options} data={data} />
      </div>
    </div>
  );
};

export default Averageprize;
