import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

import './sales.css'
import Circle_chart from "./Circle_chart";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";
import { useState } from "react";

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
    const [year,setYear] = useState(new Date().getFullYear())
    const [month,setMonth] = useState(new Date().getMonth())
    const [salesDetials,setSalesDestails]=useState({totalSales : 0,totalExpenses : 0,totalProfit: 0})
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    console.log(salesDetials)
  const getSalesExpensesProfit = async()=>{

    try {
     const data = await apiRequiestWithCredentials('get',`/admin/sales/expenses/profit/${year}/${month}`)
       setSalesDestails((prev)=>({
        ...prev,
        totalExpenses : data?.totalExpenses,
        totalSales : data?.totalSales,
        totalProfit : data?.totalProfit,
      }))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getSalesExpensesProfit()
  },[])


  return (
//   <div>
//     <Line data={data} options={options} />
//   </div>


     <div className="sales-container">
          <div className="sales-summary">
          <div className="summary-card">
          <div className="summary-title">
                    <p>Sales</p>
                    <p>{monthNames[month]} - {monthNames[month+1]}</p>
               </div>
               <h3 className="summary-value">BDT {salesDetials.totalSales}</h3>
               <hr className="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+55%</span> than last month</p>
          </div>
          <div className="summary-card">
               <div className="summary-title">
                    <p>Expenses</p>
                    <p>{monthNames[month]} - {monthNames[month+1]}</p>
               </div>
               <h3 className="summary-value">BDT {salesDetials.totalExpenses}</h3>
               <hr className="dark horizontal my-0"></hr>
               <p className="summary-label"><span className="increment">+20%</span> than last month</p>
          </div>
          <div className="summary-card">
          <div className="summary-title">
                    <p>Profit</p>
                    <p>{monthNames[month]} - {monthNames[month+1]}</p>
               </div>
               <h3 className="summary-value">BDT {salesDetials.totalProfit}</h3>
               <hr className="dark horizontal my-0"></hr>
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
