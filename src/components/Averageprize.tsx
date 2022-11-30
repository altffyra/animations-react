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

type Props = {};

const Averageprize = (props: Props) => {
  const [size, setsize] = useState<boolean>(false);

  const sizeElem = size ? "big" : "small";
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
 const f = " f"
  const data = {
    labels,
    datasets: [
      {
        label: "Prize paid",
        data: prizeSum,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div onClick={() => setsize(!size)} className={sizeElem+f}>
      Prize Reward:
      {size ? (
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
      ) : (
        ""
      )}
      <Line height={300} options={options} data={data} />
    </div>
  );
};

export default Averageprize;
