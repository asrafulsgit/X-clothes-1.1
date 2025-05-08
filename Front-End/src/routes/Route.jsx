import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Landing_page from '../Components/App/pages/Landing_page';
import Men from '../Components/Products/Men/Men';
import Women from '../Components/Products/Women/Women';
import Kids from '../Components/Products/Kids/Kids';
import Winter from '../Components/Products/Winter/Winter';
import Productinfo from '../Components/ProducInfo/Productinfo/Productinfo';
import Protect_login from '../Components/Authentication/Protect_login';
import Login from '../Components/Authentication/Login/Login';
import SignUp from '../Components/Authentication/SignIn/SignUp';

import ForgotPass from '../Components/Authentication/ForgotPassword/FindUser/ForgotPass';
import VerifyEmail from '../Components/Authentication/ForgotPassword/PrivateRoute/VerifyEmail'

import EmailVerification from '../Components/Authentication/ForgotPassword/EmailVerification/EmailVerification';
import IsVerified from '../Components/Authentication/ForgotPassword/PrivateRoute/IsVerify';
import ResetPassword from '../Components/Authentication/ForgotPassword/ResetPassword/ResetPassword';
import Protect from '../Components/PrivateSection/Protect';
import Cart from '../Components/PrivateSection/Cart/Cart';
import Profile from '../Components/PrivateSection/Profile/Profile';
import Favourite from '../Components/PrivateSection/Favourite/Favourite';
import Successfull from '../Components/PrivateSection/payment/successful/Successfull';
import Failed from '../Components/PrivateSection/payment/failed/Failed';
import Cencel from '../Components/PrivateSection/payment/cencel/Cencel';
import Protect_payment from '../Components/PrivateSection/payment/Protect_payment';
import Checkout from '../Components/PrivateSection/checkout/Checkout';
import AboutUs from '../Components/Others/AboutUs/AboutUs';
import ReturnPolicy from '../Components/Others/ReturnPolicy/ReturnPolicy';
import TermsCondition from '../Components/Others/TermsCondition/TermsCondition';
import PrivacyPolicy from '../Components/Others/PrivecyPolicy/PrivacyPolicy';
import FAQ from '../Components/Others/FAQ/FAQ';
import Private_admin from '../Components/Admin/Private_admin';
import Admin_Home from '../Components/Admin/Home/Admin_Home';
import AddProduct from '../Components/Admin/Add-product/AddProduct';
import DashBoard from '../Components/Admin/dashboard/Dashboard';
import Product_list from '../Components/Admin/product-list/Product_list';
import Order_list from '../Components/Admin/orders/Order_list';
import App from '../App';
import UpdateProduct from '../Components/Admin/Update-product/UpdateProduct';
// import Test from '../test/test';
import Discount_page from '../Components/App/discount/Discount_page';
import Today_Deals from '../Components/App/deal_today/Today_Deals';
import NotFound from '../pages/notFound/NotFound';


const Route =  createBrowserRouter([
    { path: '/',
      Component: App ,
      children: [
        {index: true, Component: Landing_page  },
        { path: 'men/:category', Component: Men  },
        { path: 'women/:category', Component: Women  },
        { path: 'kids/:category', Component: Kids  },
        { path: 'winter/:category', Component: Winter  },
        { path: 'product/:id', Component: Productinfo  },
        { path: 'product/discount/:discount', Component: Discount_page  },
        { path: 'product/today-deals', Component: Today_Deals  },
  
        {
          Component: Protect_login ,
          children: [
            { path: 'login', Component: Login  },
            { path: 'signup', Component: SignUp  },
            { path: 'find-user', Component: ForgotPass  },
          ],
        },
  
        {
          Component: VerifyEmail ,
          children: [
            { path: 'eamil-verication', Component: EmailVerification  },
          ],
        },
        {
          Component: IsVerified ,
          children: [
            { path: 'reset-password', Component: ResetPassword  },
          ],
        },
  
        {
          Component: Protect ,
          children: [
            { path: 'cart', Component: Cart  },
            { path: 'profile', Component: Profile  },
            { path: 'favourite', Component: Favourite  },
            { path: 'payment/success/:tranId', Component: Successfull  },
            { path: 'payment/failed/:tranId', Component: Failed  },
            { path: 'payment/cancel/:tranId', Component: Cencel  },
          ],
        },
  
        {
          Component: Protect_payment ,
          children: [
            { path: 'checkout', Component: Checkout  },
          ],
        },
  
        // Others
        { path: 'aboutus', Component: AboutUs  },
        { path: 'return-policy', Component: ReturnPolicy  },
        { path: 'terms-and-conditions', Component: TermsCondition  },
        { path: 'privacy-policy', Component: PrivacyPolicy  },
        { path: 'faq', Component: FAQ  },
      ],
    },
    {
      Component: Private_admin ,
      children: [
        {
          path: '/admin',
          Component: Admin_Home ,
          children: [
            { path: 'add-product', Component: AddProduct  },
            { path: 'dashboard', Component: DashBoard  },
            { path: 'product-list', Component: Product_list },
            { path: 'product/update/:productId', Component: UpdateProduct },
            { path: 'order-list', Component: Order_list  },
          ],
        },
      ],
    },
    {
      path : '/*',
      Component :  NotFound 
    },
    // {
    //   path :'/test',
    //   Component : Test 
    // }
  ]);

export default Route
