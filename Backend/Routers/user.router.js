const express = require('express');
const User = require('../Models/user.model');
const jwt = require('jsonwebtoken')
const admin = require('../firebase')
const userRouter  = express.Router();
const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin,resetPassword, EmailVerification, findUserAndSendEmail, tokenRefresh, userLogout, getAdminAuthentication} = require('../Controllers/user.controllers');
const { userPersonalInformation, avaterUpdate, addNewAddress, getUserAddresses, updateAddress, removeAddress, userResetPassword, personalInfoUpdate } = require('../Controllers/user.account.controllers');
const upload = require('../Middlewares/product.middleware');
const { validateSignup,vlidateLogin, validateAddress, validateDeleteAddress, validateResetPassword, emailValidation, EmailVerificationCode, validateEmailVerificationCode, validateEmailValidation, validateForgetPassword, validatePersonalInfoChange } = require('../validators/user.validators'); 
const {validationMiddleware } = require('../Middlewares/validation.result.middleware');
const {fileErrorHandlerMiddleware } = require('../Middlewares/fileErrorHandle.middleware');
const adminAuthentication = require('../Middlewares/adminAuth.middleware');



 

userRouter.post('/register',validateSignup,validationMiddleware, userRegister)
userRouter.post('/login',vlidateLogin,validationMiddleware, userLogin)

userRouter.get('/access/token/refresh',tokenRefresh)
userRouter.get('/admin-authentication',adminAuthentication,getAdminAuthentication)
 

// user account
userRouter.get('/user-personal-information',userAuthentication, userPersonalInformation)
userRouter.put('/user/information/update',userAuthentication,validatePersonalInfoChange,validationMiddleware, personalInfoUpdate)
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



userRouter.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name, picture } = decoded;

    let user = await User.findOne({ email });
    console.log(user)
    console.log( email, name, picture)

    if (!user) {
      user = new User({
        name,
        email,
        avatar: picture,
        google: true,
      });
      await user.save();
    }
    
    const accessToken = jwt.sign(
          {
            id: user._id, role : user.role
          },
          process.env.JWT_ACCESS_TOEKN,
          { expiresIn: "15m" }
        );
    
        const refreshToken = jwt.sign(
          {
            id: user._id, role : user.role
          },
          process.env.JWT_REFRESH_TOKEN,
          { expiresIn: "7d" }
        );
    
        user.refreshtoken = refreshToken;
        await user.save();
    
        res.cookie("accesstoken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 1000 * 60 * 15,
        });
        res.cookie("refreshtoken", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
        });
    
        return res.status(200).send({
          message: "Logged in successfully",
          success: true,
        })
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(401).json({ message: "Invalid Google token" });
  }

})











module.exports = userRouter;