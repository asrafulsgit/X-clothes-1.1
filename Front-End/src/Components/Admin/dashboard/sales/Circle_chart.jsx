import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutData = {
  labels: [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ],
  datasets: [
    {
      data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
      backgroundColor: [
        "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", 
        "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"
      ],
    },
  ],
};
const options = {
  cutout: "40%",
  plugins: {
    legend: {
      position: "bottom", 
      labels: {
        padding: 0, 
      },
    },
  },
  layout: {
    padding: {
      top: 0, 
      bottom: 0, 
    },
  },
};
const Circle_chart = () => {
  return (
     <div className="monthly-chart-container">
         <Doughnut data={doughnutData} height='100%'  options={options}/>
      </div>
  )
}

export default Circle_chart



