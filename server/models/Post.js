const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
    { timestamps: true }
)

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [commentSchema],
    },
    { timestamps: true }
)

module.exports = new mongoose.model('Post', postSchema)
