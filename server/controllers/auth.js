const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const userGetDetails = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user.id).select('-password')
        return res.json(foundUser)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
}

const userLogin = async (req, res) => {
    // checking for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        // checking if the user already exists
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            return res.status(404).json({
                errors: [{ msg: 'No user with this email address' }],
            })
        }

        // matching the email and password
        const isMatched = await bcrypt.compare(password, foundUser.password)
        if (!isMatched) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }],
            })
        }

        // signing a JSON token to get the user logged in
        const token = await jwt.sign(
            {
                user: { id: foundUser.id },
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h',
            }
        )

        return res.json({ token })
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
}

module.exports = { userGetDetails, userLogin }
