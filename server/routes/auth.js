const express = require('express')

const auth = require('../middleware/auth')
const { userGetDetails, userLogin } = require('../controllers/auth')
const { userLoginValidator } = require('../validators/user')

const router = express.Router()

// @route   GET api/auth
// @desc    To get user details of an authenticated user
// @access  Private
router.get('/', auth, userGetDetails)

// @route   POST api/auth
// @desc    To authenticate an existing user and return a token to login
// @access  Public
router.post('/', userLoginValidator, userLogin)

module.exports = router
