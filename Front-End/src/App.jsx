import React, { memo, useEffect, useState } from 'react'
import Home from './Components/App/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Login from './Components/Authentication/Login/Login'
import SignUp from './Components/Authentication/SignIn/SignUp'

import ForgotPass from './Components/Authentication/ForgotPassword/FindUser/ForgotPass'
import VerifyEmail from './Components/Authentication/ForgotPassword/PrivateRoute/VerifyEmail'
import EmailVerification from './Components/Authentication/ForgotPassword/EmailVerification/EmailVerification'
import ResetPassword from './Components/Authentication/ForgotPassword/ResetPassword/ResetPassword'

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
import Private_admin from './Components/Admin/Private_admin'
import Admin_Home from './Components/Admin/Home/Admin_Home'
import Checkout from './Components/PrivateSection/checkout/Checkout'
import Successfull from './Components/PrivateSection/payment/successful/Successfull'
import Failed from './Components/PrivateSection/payment/failed/Failed'
import Protect_payment from './Components/PrivateSection/payment/Protect_payment'
import Cencel from './Components/PrivateSection/payment/cencel/Cencel'
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
            //payment routes
            <Route path='/payment/success/:tranId' element={<Successfull />} />
            <Route path='/payment/failed/:tranId' element={<Failed />} />
            <Route path='/payment/cancel/:tranId' element={<Cencel />} />
          </Route>

          <Route element={<Protect_payment /> }>
              <Route path='/checkout' element={<Checkout />} />
          </Route>

          // admin Route
          <Route element={<Private_admin />}>
            <Route path='admin' element={<Admin_Home />} />
            {/* <Route path='/admin/add-product' element={<AddProduct />} />
            <Route path='/admin/all-product' element={<AllProducts />} />
            <Route path='/admin/dashboard' element={<DashBoard />} />
            <Route path='/admin/update-product/:id' element={<UpdateProduct />} /> */}
          </Route>

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

