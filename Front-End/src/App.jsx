import React, {  useState } from 'react'
import {  Outlet,useNavigation } from 'react-router-dom'

import Page_Load from './Page_Load'
import User from './User'
import { useDispatch} from 'react-redux'
import { setIsLoggedIn} from './utils/Controllers/UserSlice'
import ScrollProblem from './utils/ScrollProblem'
import Nav from './Components/App/Nav/Nav'
import Footer from './Components/App/Footer/Footer'
import Loading from '../../../Assignments/assignment-08/src/components/loading/Loading'
// import Shop from './Components/Shops/Shop'
const App = () => {
  const dispatch = useDispatch()

  const [loading,setLoading]=useState(true)
  const checkUserCreadentials = (value) => {
    dispatch(setIsLoggedIn(value))
    setLoading(false)
  }
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  
  return (
     <>
     <Page_Load checkUserCreadentials={checkUserCreadentials} />
      <User />
      <ScrollProblem />
      {!loading &&
        <>
          <Nav />
           { isLoading ? <Loading /> : <Outlet />}
        <Footer />
      </>
       } 
     </> 
  )
}

export default App

