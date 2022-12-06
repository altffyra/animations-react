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
        scale: true,
        fade: true,
      });
    const divs: NodeListOf<Element> = document.querySelectorAll(".buffer");
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

  const [chosenYear, setchosenYear] = useState<string>("2019");
  const yearFilter: any[] = dataJson.filter(
    (yearselected) => yearselected.awardYear == chosenYear
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 60,
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 0,
          },
        },
      },
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

  //  KATEGORINAMN SAMT UPPSÄKRING AV KRASHER
  const labels = [];
  if (yearFilter?.length > 0)
    for (var i = 0; i < yearFilter?.length; i++) {
      labels.push(yearFilter[i]?.category?.en);
    }
  else labels.push("no data");
  const lengthArray: string[] = [];

  // LÄNGDER PÅ ELEMENTEN SAMT UPPSÄKRING AV KRASHER
  if (yearFilter?.length > 0) {
    const lengthValues = yearFilter.map(
      (chosenCat) => chosenCat.laureates.length
    );
    lengthValues.forEach((element) => {
      lengthArray.push(element);
    });
  } else lengthArray.push("no data");

  const data = {
    labels,
    datasets: [
      {
        data: lengthArray,
        backgroundColor: colors,
        events: ["mousemove", "mouseout", "touchstart", "touchmove"],
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
