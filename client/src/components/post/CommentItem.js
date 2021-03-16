import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import { postDeleteComment } from '../../store/actions/post'

const CommentItem = ({
    comment: { _id, text, name, avatar, user, createdAt },
    postID,
}) => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const handleCommentDelete = () => dispatch(postDeleteComment(postID, _id))

    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img src={avatar} alt={name} class="round-img my-1" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p class="my-1">{text}</p>
                <p className="post-date">
                    Commented on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
                </p>

                {!auth.isLoading && auth.user && user === auth.user._id && (
                    <button
                        className="btn btn-danger"
                        onClick={() => handleCommentDelete(postID, _id)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

export default CommentItem
