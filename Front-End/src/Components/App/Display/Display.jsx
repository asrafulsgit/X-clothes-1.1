import React, { useEffect, useRef, useState } from 'react';
import './Display.css';
import displayImage3 from '../../../assets/display/display-07.png'
import { Link } from 'react-router-dom';
import axios from 'axios'
import socket from '../../../socket';

const Display=()=> {
  
  return (
    <>  
      <div className='display'>      
          <div className="display-left"> 
              <div className="display-image">
                <img  src={displayImage3} alt="" />
              </div>
          </div>
          <div className="display-right">
                <h1  className='display-header'>Elevate Your Style</h1>
                <p  className='display-title'>Discover the latest trends and timeless essentials — curated just for you.</p>
                <Link  to='/products/shop'><button className='display-btn'>SHOP NOW <i className="fa-solid fa-arrow-right"></i></button></Link>
          </div>
      </div> 
    
    </>
  );
}

export default Display;
