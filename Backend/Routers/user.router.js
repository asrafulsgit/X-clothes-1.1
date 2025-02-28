const express = require('express');

const userRouter  = express.Router();

const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin,resetPassword, EmailVerification, findUserAndSendEmail, tokenRefresh, userLogout} = require('../Controllers/user.controllers');
const { userPersonalInformation } = require('../Controllers/user.account.controllers');




userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/access/token/refresh',tokenRefresh)

// user account
userRouter.get('/user-personal-information',userAuthentication, userPersonalInformation)


// logout
userRouter.get('/user-logout',userAuthentication,userLogout)


// forgot password
userRouter.post('/forgot-password-email',findUserAndSendEmail)
userRouter.post('/forgot-password-email-verification',EmailVerification)
userRouter.put('/reset-password',resetPassword)



module.exports = userRouter;