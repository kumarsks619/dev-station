import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import { postUpdateLike, postDelete } from '../../store/actions/post'

const PostItem = ({
    post: { text, name, avatar, user, _id, likes, comments, createdAt },
    showActions = true,
}) => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const handlePostLike = (postID) => dispatch(postUpdateLike(postID))
    const handlePostUnlike = (postID) => dispatch(postUpdateLike(postID, true))

    const handlePostDelete = (postID) => dispatch(postDelete(postID))

    return (
        <div className="post bg-white my-1 p-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img src={avatar} alt={name} className="round-img my-1" />
                    <h4>{name}</h4>
                </Link>
            </div>

            <div>
                <p className="my-1">{text}</p>
                <p className="post-date my-1">
                    Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
                </p>

                {showActions && (
                    <>
                        {!auth.isLoading && auth.user && (
                            <>
                                <button
                                    className={
                                        likes.findIndex(
                                            (like) => like.user === auth.user._id
                                        ) !== -1
                                            ? 'btn btn-active'
                                            : 'btn'
                                    }
                                    onClick={() => handlePostLike(_id)}
                                    disabled={
                                        likes.findIndex(
                                            (like) => like.user === auth.user._id
                                        ) !== -1
                                    }
                                >
                                    <i className="fas fa-thumbs-up"></i>{' '}
                                    <span>{likes.length}</span>
                                </button>
                                <button
                                    className={
                                        likes.findIndex(
                                            (like) => like.user === auth.user._id
                                        ) === -1
                                            ? 'btn btn-disabled'
                                            : 'btn'
                                    }
                                    onClick={() => handlePostUnlike(_id)}
                                    disabled={
                                        likes.findIndex(
                                            (like) => like.user === auth.user._id
                                        ) === -1
                                    }
                                >
                                    <i className="fas fa-thumbs-down"></i>
                                </button>{' '}
                            </>
                        )}

                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion{' '}
                            <span className="comment-count">{comments.length}</span>
                        </Link>

                        {!auth.isLoading && auth.user && user === auth.user._id && (
                            <button
                                className="btn btn-danger"
                                onClick={() => handlePostDelete(_id)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default PostItem
