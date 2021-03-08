const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const userRegister = async (req, res) => {
    // checking for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        // checking if the user already exists
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }],
            })
        }

        // get user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })

        // encrypting the user's password
        const salt = await bcrypt.genSalt(13)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Creating and saving the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar,
        })
        await newUser.save()

        // signing a JSON token to get the user logged in right away
        const token = await jwt.sign(
            {
                user: { id: newUser.id },
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

module.exports = {
    userRegister,
}
