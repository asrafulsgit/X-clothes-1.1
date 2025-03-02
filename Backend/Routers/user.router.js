const express = require('express');

const userRouter  = express.Router();

const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin,resetPassword, EmailVerification, findUserAndSendEmail, tokenRefresh, userLogout} = require('../Controllers/user.controllers');
const { userPersonalInformation, avaterUpdate } = require('../Controllers/user.account.controllers');
const upload = require('../Middlewares/product.middleware');




userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/access/token/refresh',tokenRefresh)
 

// user account
userRouter.get('/user-personal-information',userAuthentication, userPersonalInformation)
userRouter.put('/user-avater',userAuthentication,upload.single('avatar'), avaterUpdate)


// logout
userRouter.get('/user-logout',userAuthentication,userLogout)


// forgot password
userRouter.post('/forgot-password-email',findUserAndSendEmail)
userRouter.post('/forgot-password-email-verification',EmailVerification)
userRouter.put('/reset-password',resetPassword)



module.exports = userRouter;