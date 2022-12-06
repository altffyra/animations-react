import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataJson from "../assets/json_laureates.json";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
import gsap from "gsap";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  animation: string;
};

const Genderwins = (props: Props) => {
  const elemRef3 = React.useRef(
    ""
  ) as unknown as React.MutableRefObject<HTMLInputElement>;
  const state = Flip.getState(".animGen3");

  function doFlip3() {
    elemRef3.current.classList.toggle("small");
    elemRef3.current.classList.toggle("big");
    elemRef3.current.classList.add("disabled");
    if (props.animation != "")
      Flip.from(state, {
        duration: 1,
        ease: props.animation,
        absolute: true,
        scale:true
      });

    const divs: NodeListOf<Element> = document.querySelectorAll(".buffer");
    divs.forEach((element) => {
      element.classList.add("disabled");
    });
    disabledTimer();
  }

  function disabledTimer() {
    setTimeout(() => {
      elemRef3.current.classList.remove("disabled");
      const divs: NodeListOf<Element> = document.querySelectorAll(".buffer");
      divs.forEach((element) => {
        element.classList.remove("disabled");
      });
    }, 1500);
  }

  const allgender: any = dataJson.map((token) => token.gender);
  const multiArray: any = [...new Set(allgender)];
  let genderArr: any = [];
  multiArray.forEach((multiArr: any[] | any) => {
    genderArr[multiArr] = [];
    allgender.forEach((winner: any) => {
      multiArr == winner ? genderArr[multiArr].push(winner) : null;
    });
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 60
  },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels: ["Female", "Male", "Orgs"],
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
        events: ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
      },
    ],
  };
  return (
    <div className="buffer">
      <div
        ref={elemRef3}
        onClick={() => doFlip3()}
        className={"small animGen3"}
      >
        <p>Gender diversity</p>
        <Pie options={options} data={data} />
      </div>
    </div>
  );
};

export default Genderwins;
