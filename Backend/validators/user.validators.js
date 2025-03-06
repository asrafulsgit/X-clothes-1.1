
const {body} = require('express-validator')

const validateSignup =[
     body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
     .escape(),
     body('email').trim().isEmail().withMessage('Invalid email format')
     .matches(/@gmail\.com$/).withMessage('Email must end with @email.com')
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



module.exports={
     validateSignup,
     vlidateLogin
}
