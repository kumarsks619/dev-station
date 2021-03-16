import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postAddComment } from '../../store/actions/post'

const CommentForm = ({ postID }) => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(postAddComment(postID, { text }))
        setText('')
    }

    return (
        <div className="post-form">
            <div className="bg-primary">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={handleOnSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm
