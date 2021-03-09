const { check } = require('express-validator')

const postCreateValidator = [
    check('text', 'Post content must not be empty').not().isEmpty(),
]

const postAddCommentValidator = [
    check('text', 'Comment body must not be empty').not().isEmpty(),
]

module.exports = { postCreateValidator, postAddCommentValidator }
