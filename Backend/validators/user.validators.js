const {body, param} = require('express-validator')

const validateSignup =[
     body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
     .escape(),
     body('email').trim().isEmail().withMessage('Invalid email format')
     .matches(/@gmail\.com$/).withMessage('Email must end with @gmail.com')
     .normalizeEmail(),
     body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain an numeric value')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain an lowercase letter')
    .escape()
]

const vlidateLogin =[
     body('email').trim().isEmail().withMessage('Invalid email format').normalizeEmail(),
     body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').escape()
]

const validateAddress = [
     body('name').isString().notEmpty().withMessage('Name is required.').escape(),
     body('zila').notEmpty().withMessage('Zila is required.').escape(),
     body('upazila').notEmpty().withMessage('Upazila is required.').escape(),
     body('email').trim().isEmail().withMessage('Invalid email format')
     .matches(/@gmail\.com$/).withMessage('Email must end with @gmail.com')
     .normalizeEmail().optional(),
     body('phone')
     .matches(/^01[3-9]\d{8}$/).withMessage('Phone number must start with 01 and be followed by 9 digits.')
     .isLength({min: 11,max : 11}).withMessage('Invalid phone number format.')
     .escape(),
]

const validateDeleteAddress = [
     param('addressId').isMongoId().withMessage('Invalid ID format. Must be a valid MongoDB ObjectId.').escape(), 
]

const validateResetPassword =[
     body('oldPassword').isLength({ min: 6 }).withMessage('Old password must be at least 6 characters long.').escape(),
         body('newPassword').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
         .matches(/\d/).withMessage('Password must contain an numeric value')
         .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
         .matches(/[a-z]/).withMessage('Password must contain an lowercase letter')
         .escape(), 

     body('confirmPassword')
     .exists().withMessage('Confirm password is required.')
     .custom((value, { req }) => value === req.body.newPassword).withMessage('Confirm password must match new password.').escape(),
]

const validateEmailValidation = [
     body('email').isEmail().withMessage('Invalid email format')
     .matches(/@gmail\.com$/).withMessage('Email must end with @gmail.com')
     .normalizeEmail().optional()
]

const validateEmailVerificationCode = [
     body('email').trim().isEmail().withMessage('Invalid email format').normalizeEmail(),
     body('code')
     .isLength({ min: 6, max: 6 }).withMessage('Verification code must be exactly 6 digits.')
     .isNumeric().withMessage('Verification code must be a numeric value.').escape()
]

const validateForgetPassword =[
     body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
     .matches(/\d/).withMessage('Password must contain an numeric value')
     .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
     .matches(/[a-z]/).withMessage('Password must contain an lowercase letter')
     .escape(), 

 body('rePassword')
 .exists().withMessage('Confirm password is required.')
 .custom((value, { req }) => value === req.body.password).withMessage('Confirm password must match new password.').escape(),
]



module.exports={
     validateSignup,
     vlidateLogin,
     validateAddress,
     validateDeleteAddress,
     validateResetPassword,
     validateEmailValidation,
     validateEmailVerificationCode,
     validateForgetPassword
}
