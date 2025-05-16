import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./analytics.css";
import Nav from "../../../App/Nav/Nav";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const barData = {
  labels: ["M", "T", "W", "T", "F", "S", "S"],
  datasets: [
    {
      label: "Website Views",
      data: [50, 45, 20, 30, 45, 55, 75],
      backgroundColor: "#D91656",
    },
  ],
};

const lineData = {
  labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  datasets: [
    {
      label: "Daily Sales",
      data: [200, 150, 300, 450, 350, 400, 370, 390, 310, 400, 300, 250],
      borderColor: "#D91656",
      backgroundColor: "#D91656",
      tension: 0.4,
    },
  ],
};

const lineDataTasks = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Completed Tasks",
      data: [50, 200, 300, 250, 450, 320, 400, 350, 500],
      borderColor: "#D91656",
      backgroundColor: "#D91656",
      tension: 0.4,
    },
  ],
};

const Analytics = () => {
  return (
     <>
     {/* <Nav /> */}
     {/* <div className="analytics-container">
          <div className="analytics-summary">
          <div className="summary-card">
               <p className="summary-title">Order</p>
               <h3 className="summary-value">281</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+55%</span> than last week</p>
          </div>
          <div className="summary-card">
               <p className="summary-title">Order</p>
               <h3 className="summary-value">281</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+25%</span> of Order</p>
          </div>
          <div className="summary-card">
               <p className="summary-title">Users</p>
               <h3 className="summary-value">3425</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+20%</span> than last week</p>
          </div>
          <div className="summary-card">
               <p className="summary-title">Total Customers</p>
               <h3 className="summary-value">2,910</h3>
               <hr class="dark horizontal my-0"></hr>
               <p className="summary-label">Just updated</p>
          </div>
          </div>
          <div className="analytics-grid">
          <div className="analytics-card">
               <h3 className="card-title">Website Views</h3>
               <p className="card-subtitle">Last Campaign Performance</p>
               <Bar data={barData} />
          </div>
          <div className="analytics-card">
               <h3 className="card-title">Daily Sales</h3>
               <p className="card-subtitle">(+15%) increase in today sales.</p>
               <Line data={lineData} />
          </div>
          <div className="analytics-card">
               <h3 className="card-title">Completed Tasks</h3>
               <p className="card-subtitle">Last Campaign Performance</p>
               <Line data={lineDataTasks} />
          </div>
          </div>
          
     </div> */}
    </>
  );
};

export default Analytics;