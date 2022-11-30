import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataJson from "../assets/json_laureates.json";


ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {};

const Genderwins = (props: Props) => {
  const [size, setsize] = useState<boolean>(false);
  const sizeElem = size ? "big" : "small";

  const allgender: any = dataJson.map(
    (token) => token.gender
  );
  const multiArray: any = [...new Set(allgender)];
  let genderArr: any = [];
  multiArray.forEach((multiArr: any[]| any) => {
    genderArr[multiArr] = [];
    allgender.forEach((winner: any) => {
      multiArr == winner ? genderArr[multiArr].push(winner) : null;
    });
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels: ["Female", "Male", "Undefined"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          genderArr.female?.length,
          genderArr.male?.length,
          genderArr.undefined?.length,
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
    <div onClick={() => setsize(!size)} className={sizeElem}>
      <p>Gender diversity</p>
      <Pie options={options} data={data} />
    </div>
  );
};

export default Genderwins;
