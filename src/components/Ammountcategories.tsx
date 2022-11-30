import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dataJson from "../assets/json_award.json";
import { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {};

const Ammountcategories = (props: Props) => {
  const [size, setsize] = useState<boolean>(false);
 const f = "hej"
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
    <div onClick={() => setsize(!size)} className={sizeElem}>
      <p>Category has been awarded</p>
      <Pie  options={options} data={data}  />
    </div>
  );
};

export default Ammountcategories;
