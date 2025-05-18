import React, { useState} from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import Page_Load from './Page_Load';
import User from './User';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from './utils/Controllers/UserSlice';
import ScrollProblem from './utils/ScrollProblem';
import Nav from './Components/App/Nav/Nav';
import Footer from './Components/App/Footer/Footer';
const App = () => {
  const dispatch = useDispatch();

  const checkUserCreadentials = (value) => {
    dispatch(setIsLoggedIn(value));
  };


  return (
    <>
      <Page_Load checkUserCreadentials={checkUserCreadentials} />
      <User />
      <ScrollProblem />
      
        <>
          <Nav />
            <Outlet />
          <Footer />
        </>
    </>
  );
};

export default App;
