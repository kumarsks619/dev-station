const { check } = require('express-validator')

const userRegisterValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password must have atleast 6 characters').isLength({ min: 6 }),
]

const userLoginValidator = [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password is required to login').exists(),
]

module.exports = {
    userRegisterValidator,
    userLoginValidator,
}
