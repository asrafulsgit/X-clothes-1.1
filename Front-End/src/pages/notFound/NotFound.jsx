import React from 'react';
import './NotFound.css'; // CSS file
import { Link } from 'react-router-dom';
// import NotFoundImage from './404-illustration.svg'; 

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={'NotFoundImage'} alt="404 Not Found" className="notfound-image" />
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link  to ='/'><button className="home-button">Go Home</button></Link>
    </div>
  );
};

export default NotFound;
