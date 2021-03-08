const express = require('express')

const { userRegisterValidator } = require('../validators/user')
const { userRegister } = require('../controllers/user')

const router = express.Router()

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', userRegisterValidator, userRegister)

module.exports = router
