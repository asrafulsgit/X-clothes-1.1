// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
// } from 'chart.js';
// import './dashboard.css'
// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// );
// const Dashboard = () => {
//   const salesData = {
//      daily: {
//        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//        data: [120, 190, 300, 250, 200, 150, 400],
//      },
//      monthly: {
//        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//        data: [1000, 1500, 2000, 1800, 2500, 3000],
//      },
//    };
//    const recentOrders = [
//      { _id: 1, orderId: 'ORD123', customer: 'John Doe', amount: 120, status: 'Delivered' },
//      { _id: 2, orderId: 'ORD124', customer: 'Jane Smith', amount: 200, status: 'Pending' },
//    ];
//    const topProducts = [
//      { _id: 1, name: 'T-Shirt', category: 'Clothing', sales: 500 },
//      { _id: 2, name: 'Jeans', category: 'Clothing', sales: 400 },
//    ];
  

//   // Chart data for daily sales
//   const dailySalesData = {
//     labels: salesData.daily?.labels || [],
//     datasets: [
//       {
//         label: 'Daily Sales',
//         data: salesData.daily?.data || [],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart data for monthly sales
//   const monthlySalesData = {
//     labels: salesData.monthly?.labels || [],
//     datasets: [
//       {
//         label: 'Monthly Sales',
//         data: salesData.monthly?.data || [],
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <h1>Dashboard 📊</h1>

//       {/* Cards for Overview */}
//       <div className="cards">
//         <div className="card">
//           <h3>Total Sales</h3>
//           <p>$12,345</p>
//         </div>
//         <div className="card">
//           <h3>Total Orders</h3>
//           <p>1,234</p>
//         </div>
//         <div className="card">
//           <h3>Total Users</h3>
//           <p>567</p>
//         </div>
//         <div className="card">
//           <h3>Total Revenue</h3>
//           <p>$98,765</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="charts">
//         <div className="chart">
//           <h3>Daily Sales</h3>
//           <Line data={dailySalesData} />
//         </div>
//         <div className="chart">
//           <h3>Monthly Sales</h3>
//           <Bar data={monthlySalesData} />
//         </div>
//       </div>

//       {/* Recent Orders Table */}
//       <div className="recent-orders">
//         <h3>Recent Orders</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentOrders.map(order => (
//               <tr key={order._id}>
//                 <td>{order.orderId}</td>
//                 <td>{order.customer}</td>
//                 <td>${order.amount}</td>
//                 <td>{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Top Selling Products Table */}
//       <div className="top-products">
//         <h3>Top Selling Products</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Sales</th>
//             </tr>
//           </thead>
//           <tbody>
//             {topProducts.map(product => (
//               <tr key={product._id}>
//                 <td>{product.name}</td>
//                 <td>{product.category}</td>
//                 <td>{product.sales}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import Analytics from "./analytics/Analytics";
import Sales from "./sales/Sales";


const DashBoard = () => {
  
  return (
  <>
          <Sales />
          {/* <Analytics /> */}
        </>)
};

export default DashBoard;





