const express = require('express')

const {
    postCreate,
    postGetAll,
    postGetByID,
    postDelete,
    postLike,
    postUnlike,
    postAddComment,
    postDeleteComment,
} = require('../controllers/post')
const auth = require('../middleware/auth')
const { postCreateValidator, postAddCommentValidator } = require('../validators/post')

const router = express.Router()

// @route   POST api/posts
// @desc    To create a new post
// @access  Private
router.post('/', auth, postCreateValidator, postCreate)

// @route   GET api/posts
// @desc    To get all posts
// @access  Private
router.get('/', auth, postGetAll)

// @route   GET api/posts/:postID
// @desc    To get single post by post ID
// @access  Private
router.get('/:postID', auth, postGetByID)

// @route   DELETE api/posts/:postID
// @desc    To delete a post
// @access  Private
router.delete('/:postID', auth, postDelete)

// @route   PATCH api/posts/:postID/like
// @desc    To like a post
// @access  Private
router.patch('/:postID/like', auth, postLike)

// @route   PATCH api/posts/:postID/unlike
// @desc    To unlike (remove like) a post
// @access  Private
router.patch('/:postID/unlike', auth, postUnlike)

// @route   PATCH api/posts/:postID/comment
// @desc    To comment on a post
// @access  Private
router.patch('/:postID/comment', auth, postAddCommentValidator, postAddComment)

// @route   DELETE api/posts/:postID/comment/:commentID
// @desc    To delete a comment
// @access  Private
router.delete('/:postID/comment/:commentID', auth, postDeleteComment)

module.exports = router
