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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {};
const CategoryForYear = (props: Props) => {
  const [size, setsize] = useState<boolean>(false);
  const sizeElem = size ? "big" : "small";
  const [chosenYear, setchosenYear] = useState<string>("2019");
  const yearFilter: any[] = dataJson.filter(
    (yeardata) => yeardata.awardYear == chosenYear
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
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
    yearFilter[5]?.category.en,
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
      },
    ],
  };

  return (
    <div onClick={() => setsize(!size)} className={sizeElem}>
      Awards given year:
      {size ? (
        <input
          onClick={(e) => e.stopPropagation()}
          type="number"
          value={chosenYear}
          onChange={(e) => setchosenYear(e.target.value)}
        />
      ) : (
        ""
      )}
      <Bar options={options} data={data} />
    </div>
  );
};

export default CategoryForYear;
