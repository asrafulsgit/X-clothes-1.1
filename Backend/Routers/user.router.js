const express = require('express');

const userRouter  = express.Router();

const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin,resetPassword, EmailVerification, findUserAndSendEmail, tokenRefresh, userLogout} = require('../Controllers/user.controllers');
const { userPersonalInformation, avaterUpdate, addNewAddress, getUserAddresses, updateAddress, removeAddress, userResetPassword } = require('../Controllers/user.account.controllers');
const upload = require('../Middlewares/product.middleware');




userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/access/token/refresh',tokenRefresh)
 

// user account
userRouter.get('/user-personal-information',userAuthentication, userPersonalInformation)
userRouter.put('/user-avater',userAuthentication,upload.single('avatar'), avaterUpdate)
userRouter.post('/user-new-address',userAuthentication, addNewAddress)
userRouter.get('/user-addresses',userAuthentication, getUserAddresses)
userRouter.put('/user-update-address/:addressId',userAuthentication,updateAddress)
userRouter.delete('/user-delete-address/:addressId',userAuthentication,removeAddress)

userRouter.put('/user-manage-password',userAuthentication,userResetPassword)


// logout
userRouter.get('/user-logout',userAuthentication,userLogout)


// forgot password
userRouter.post('/forgot-password-email',findUserAndSendEmail)
userRouter.post('/forgot-password-email-verification',EmailVerification)
userRouter.put('/reset-password',resetPassword)



module.exports = userRouter;