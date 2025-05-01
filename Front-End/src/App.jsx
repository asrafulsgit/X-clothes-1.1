import React, { useState, Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import Page_Load from './Page_Load';
import User from './User';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from './utils/Controllers/UserSlice';
import ScrollProblem from './utils/ScrollProblem';
import Nav from './Components/App/Nav/Nav';
import Footer from './Components/App/Footer/Footer';
import Loading from './utils/loading/Loading'; // Your custom loading spinner

const App = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);

  const checkUserCreadentials = (value) => {
    dispatch(setIsLoggedIn(value));
    // setLoading(false);
  };

  // const navigation = useNavigation();
  // const isLoading = navigation.state === "loading";

  return (
    <>
      <Page_Load checkUserCreadentials={checkUserCreadentials} />
      <User />
      <ScrollProblem />
      
        <>
          <Nav />
          <Suspense fallback={ <div><h1>Loadin...</h1></div> }>
             <Outlet />
          </Suspense>
          <Footer />
        </>
    </>
  );
};

export default App;
