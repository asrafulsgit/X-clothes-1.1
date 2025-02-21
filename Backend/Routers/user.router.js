const express = require('express');

const userRouter  = express.Router();

const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin, userProfile, resetPassword, EmailVerification, findUserAndSendEmail, tokenRefresh, userLogout} = require('../Controllers/user.controllers');




userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/access/token/refresh',tokenRefresh)

// user profile
userRouter.get('/user-profile',userAuthentication, userProfile)

// logout
userRouter.get('/user-logout',userAuthentication,userLogout)


// forgot password
userRouter.post('/forgot-password-email',findUserAndSendEmail)
userRouter.post('/forgot-password-email-verification',EmailVerification)
userRouter.put('/reset-password',resetPassword)



module.exports = userRouter;