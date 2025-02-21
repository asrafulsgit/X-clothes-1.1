import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const ScrollProblem = () => {
     const location = useLocation();
     useEffect(() => {
          window.scrollTo(0, 0); // Reset scroll position to top when route changes
     }, [location]);
     
     return ( null)
}

export default ScrollProblem
