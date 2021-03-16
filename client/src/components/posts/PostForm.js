import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postCreate } from '../../store/actions/post'

const PostForm = () => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(postCreate({ text }))
        setText('')
    }

    return (
        <div className="post-form">
            <div className="post-form-header bg-primary">
                <h3>Say Something...</h3>
            </div>

            <form className="form my-1" onSubmit={handleOnSubmit}>
                <textarea
                    required
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <input type="submit" value="Submit" className="btn btn-dark my-1" />
            </form>
        </div>
    )
}

export default PostForm
