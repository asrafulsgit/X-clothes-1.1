import React from "react";

import './header.css'
import { Link } from "react-router-dom";

const Header = ({param,name,header}) => {
  return (
    <div className="header-section-container">
      <div className="header-banner">
       <h1>{header}</h1>
       <div className="header-links">
         <Link to="/">Home</Link>|
         <Link to={param}>{name}</Link>
       </div>
      </div>
    </div>
  );
};

export default Header;
