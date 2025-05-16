import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

import './sales.css'
import Circle_chart from "./Circle_chart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Organic Search",
      data: [20, 100, 250, 220, 500, 300, 400, 250, 500],
      borderColor: "#ff0066",
      backgroundColor: "#ff0066",
      tension: 0.4,
    },
    {
      label: "Direct",
      data: [10, 60, 90, 90, 200, 130, 180, 170, 220],
      borderColor: "#00BFFF",
      backgroundColor: "#00BFFF",
      tension: 0.4,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const Sales = () => {
  return (
//   <div>
//     <Line data={data} options={options} />
//   </div>


     <div className="sales-container">
          <div className="sales-summary">
          <div className="summary-card">
          <div className="summary-title">
                    <p>Sales</p>
                    <p>Mar - Apr</p>
               </div>
               <h3 className="summary-value">BDT 3425</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+55%</span> than last month</p>
          </div>
          <div className="summary-card">
               <div className="summary-title">
                    <p>Expenses</p>
                    <p>Mar - Apr</p>
               </div>
               <h3 className="summary-value">BDT 3000</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+20%</span> than last month</p>
          </div>
          <div className="summary-card">
          <div className="summary-title">
                    <p>Profit</p>
                    <p>Mar - Apr</p>
               </div>
               <h3 className="summary-value">BDT 2,910</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label">Just updated</p>
          </div>
          </div>
          <div className="sales-grid">
               <div className="sales-card circle-cart">
                    <h3 className="card-title">Monthly Performance</h3>
                    <p className="card-subtitle">Sales distribution across months.</p>
                    <Circle_chart />
               </div>
               <div className="sales-card carve-chart">
                    <h3 className="card-title">Daily Sales</h3>
                    <p className="card-subtitle">(+15%) increase in today sales.</p>
                    <Line data={data} options={options} />
               </div>
          </div>
          
     </div>
);
}

export default Sales
