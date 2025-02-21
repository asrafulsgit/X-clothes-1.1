import React, { memo, useEffect, useState } from 'react'
import Home from './Components/App/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Login from './Components/Authentication/Login/Login'
import SignUp from './Components/Authentication/SignIn/SignUp'

import ForgotPass from './Components/Authentication/ForgotPassword/FindUser/ForgotPass'
import VerifyEmail from './Components/Authentication/ForgotPassword/PrivateRoute/VerifyEmail'
import EmailVerification from './Components/Authentication/ForgotPassword/EmailVerification/EmailVerification'
import ResetPassword from './Components/Authentication/ForgotPassword/ResetPassword/ResetPassword'

import AddProduct from './Components/Admin/Add-product/AddProduct'
import AllProducts from './Components/Admin/All-product/AllProducts'

import DashBoard from './Components/Admin/Dash-Board/DashBoard'
import UpdateProduct from './Components/Admin/Update-product/UpdateProduct'

import AboutUs from './Components/Others/AboutUs/AboutUs'
import ReturnPolicy from './Components/Others/ReturnPolicy/ReturnPolicy'
import TermsCondition from './Components/Others/TermsCondition/TermsCondition'
import PrivacyPolicy from './Components/Others/PrivecyPolicy/PrivacyPolicy'
import FAQ from './Components/Others/FAQ/FAQ'

import Cart from './Components/PrivateSection/Cart/Cart'
import Favourite from './Components/PrivateSection/Favourite/Favourite'
import Profile from './Components/PrivateSection/Profile/Profile'
import Protect from './Components/PrivateSection/Protect'
import Protect_login from './Components/Authentication/Protect_login'

import Men from './Components/Products/Men/Men'
import Women from './Components/Products/Women/Women'
import Kids from './Components/Products/Kids/Kids'
import Winter from './Components/Products/Winter/Winter'
import Productinfo from './Components/ProducInfo/Productinfo/Productinfo'
import Page_Load from './Page_Load'
import User from './User'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn} from './utils/Controllers/UserSlice'
import IsVerified from './Components/Authentication/ForgotPassword/PrivateRoute/IsVerify'
import ScrollProblem from './utils/ScrollProblem'
// import Shop from './Components/Shops/Shop'
const App = () => {
  const dispatch = useDispatch()
  const [loading,setLoading]=useState(true)
  const checkUserCreadentials = (value) => {
    dispatch(setIsLoggedIn(value))
    setLoading(false)
  }
  
  
  return (
    <BrowserRouter >
      <Page_Load checkUserCreadentials={checkUserCreadentials} />
      <User />
      <ScrollProblem />
      {!loading &&
        <Routes>
          // public Route 
          <Route path='/' element={<Home />} />
          <Route path='/men/:category' element={<Men />} />
          <Route path='/women/:category' element={<Women />} />
          <Route path='/kids/:category' element={<Kids />} />
          <Route path='/winter/:category' element={<Winter />} />
          <Route path='/product/:id' element={<Productinfo />} />
          {/* <Route path='/products/shop' element={<Shop />}/>   */}

    // authenticator Route

          <Route element={<Protect_login />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/find-user' element={<ForgotPass />} />
          </Route>

      // forgot-password
          <Route element={<VerifyEmail />}>
            <Route path='/eamil-verication' element={<EmailVerification />} />
          </Route>
          <Route element={<IsVerified />}>
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route> 

    //Private Route
          //only authorized person can access this pages
          <Route element={<Protect />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/favourite' element={<Favourite />} />
          </Route>

          // admin Route

          <Route path='/admin/add-product' element={<AddProduct />} />
          <Route path='/admin/all-product' element={<AllProducts />} />
          <Route path='/admin/dashboard' element={<DashBoard />} />
          <Route path='/admin/update-product/:id' element={<UpdateProduct />} />


    // Others Route
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsCondition />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/faq' element={<FAQ />} />

        </Routes>}
    </BrowserRouter>
  )
}

export default App

