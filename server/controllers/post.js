const { validationResult } = require('express-validator')

const User = require('../models/User')
const Post = require('../models/Post')

const postCreate = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const currentUser = await User.findById(req.user.ID).select('-password')

        const newPost = new Post({
            text: req.body.text,
            name: currentUser.name,
            avatar: currentUser.avatar,
            user: req.user.ID,
        })

        const createdPost = await newPost.save()

        return res.json(createdPost)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
}

const postGetAll = async (req, res) => {
    try {
        const foundPosts = await Post.find().sort({ createdAt: -1 })
        return res.json(foundPosts)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
}

const postGetByID = async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postID)
        if (!foundPost) {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        return res.json(foundPost)
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        return res.status(500).send('Server Error')
    }
}

const postDelete = async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postID)
        if (!foundPost) {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        // checking if the current user is the owner of the post
        if (foundPost.user.toString() !== req.user.ID) {
            return res.status(401).json({ msg: 'User can only delete own posts' })
        }

        await foundPost.remove()

        return res.json({ msg: 'Post deleted' })
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        return res.status(500).send('Server Error')
    }
}

const postLike = async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postID)
        if (!foundPost) {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        // checking if the post is already liked by the current user
        if (
            foundPost.likes.filter((like) => like.user.toString() === req.user.ID).length
        ) {
            return res.status(400).json({ msg: 'Post already liked by the current user' })
        }

        foundPost.likes.unshift({ user: req.user.ID })
        foundPost.save()

        return res.json(foundPost.likes)
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        return res.status(500).send('Server Error')
    }
}

const postUnlike = async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postID)
        if (!foundPost) {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        // finding the index of the like to be removed
        const removeIndex = foundPost.likes.findIndex(
            (like) => like.user.toString() === req.user.ID
        )

        // checking if the post is already liked by the current user
        if (removeIndex === -1) {
            return res.status(400).json({
                msg: 'Cannot unlike, as the post is not liked by the current user',
            })
        }

        // removing the like from the array of likes
        foundPost.likes.splice(removeIndex, 1)
        foundPost.save()

        return res.json(foundPost.likes)
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        return res.status(500).send('Server Error')
    }
}

const postAddComment = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const currentUser = await User.findById(req.user.ID).select('-password')

        const foundPost = await Post.findById(req.params.postID)
        if (!foundPost) {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        const newComment = {
            text: req.body.text,
            name: currentUser.name,
            avatar: currentUser.avatar,
            user: req.user.ID,
        }

        foundPost.comments.unshift(newComment)
        await foundPost.save()

        return res.json(foundPost.comments)
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        return res.status(500).send('Server Error')
    }
}

const postDeleteComment = async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postID)
        if (!foundPost) {
            return res.status(404).json({ msg: 'No post found with this post ID' })
        }

        // finding the index of the comment to be deleted
        const removeIndex = foundPost.comments.findIndex(
            (comment) => comment.id === req.params.commentID
        )

        // checking if the comment exists or not
        if (removeIndex === -1) {
            return res.status(404).json({ msg: 'No comment found with this comment ID' })
        }

        // checking if the user is the owner of the comment or the post
        if (
            foundPost.comments[removeIndex].user.toString() === req.user.ID ||
            foundPost.user.toString() === req.user.ID
        ) {
            foundPost.comments.splice(removeIndex, 1)
            await foundPost.save()

            return res.json(foundPost.comments)
        } else {
            return res
                .status(401)
                .json({ msg: 'Current user is not authorized to delete this comment' })
        }
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ msg: 'No post or comment found with the specified ID' })
        }

        return res.status(500).send('Server Error')
    }
}

module.exports = {
    postCreate,
    postGetAll,
    postGetByID,
    postDelete,
    postLike,
    postUnlike,
    postAddComment,
    postDeleteComment,
}
