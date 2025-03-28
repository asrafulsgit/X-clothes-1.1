const express = require('express');

const userRouter  = express.Router();

const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin,resetPassword, EmailVerification, findUserAndSendEmail, tokenRefresh, userLogout, getAdminAuthentication} = require('../Controllers/user.controllers');
const { userPersonalInformation, avaterUpdate, addNewAddress, getUserAddresses, updateAddress, removeAddress, userResetPassword } = require('../Controllers/user.account.controllers');
const upload = require('../Middlewares/product.middleware');
const { validateSignup,vlidateLogin, validateAddress, validateDeleteAddress, validateResetPassword, emailValidation, EmailVerificationCode, validateEmailVerificationCode, validateEmailValidation, validateForgetPassword } = require('../validators/user.validators'); 
const {validationMiddleware } = require('../Middlewares/validation.result.middleware');
const {fileErrorHandlerMiddleware } = require('../Middlewares/fileErrorHandle.middleware');
const adminAuthentication = require('../Middlewares/adminAuth.middleware');


 

userRouter.post('/register',validateSignup,validationMiddleware, userRegister)
userRouter.post('/login',vlidateLogin,validationMiddleware, userLogin)

userRouter.get('/access/token/refresh',tokenRefresh)
userRouter.get('/admin-authentication',adminAuthentication,getAdminAuthentication)
 

// user account
userRouter.get('/user-personal-information',userAuthentication, userPersonalInformation)
userRouter.put('/user-avater',userAuthentication,upload.single('avatar'),fileErrorHandlerMiddleware, avaterUpdate)
userRouter.post('/user-new-address',userAuthentication,validateAddress,validationMiddleware, addNewAddress)
userRouter.get('/user-addresses',userAuthentication, getUserAddresses)
userRouter.put('/user-update-address/:addressId',userAuthentication,validateDeleteAddress, validateAddress,validationMiddleware, updateAddress)
userRouter.delete('/user-delete-address/:addressId',userAuthentication,validateDeleteAddress,validationMiddleware, removeAddress)

userRouter.put('/user-manage-password',userAuthentication,validateResetPassword,validationMiddleware, userResetPassword)


// logout
userRouter.get('/user-logout',userAuthentication,userLogout)


// forgot password
userRouter.post('/forgot-password-email',validateEmailValidation,validationMiddleware, findUserAndSendEmail)
userRouter.post('/forgot-password-email-verification',validateEmailVerificationCode,validationMiddleware, EmailVerification)
userRouter.put('/reset-password',validateForgetPassword,validationMiddleware, resetPassword)



module.exports = userRouter;