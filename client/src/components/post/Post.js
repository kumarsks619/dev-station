import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import { postGetByID } from '../../store/actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ match }) => {
    const dispatch = useDispatch()
    const { post, isLoading } = useSelector((state) => state.post)

    const postID = match.params.postID

    useEffect(() => {
        if (postID) {
            dispatch(postGetByID(postID))
        }
    }, [dispatch, postID])

    return isLoading || post === null ? (
        <Loader />
    ) : (
        <>
            <Link to="/posts" class="btn">
                Back To Timeline
            </Link>

            <PostItem post={post} showDiscussionBtn={false} />

            <CommentForm postID={postID} />

            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} postID={postID} />
                ))}
            </div>
        </>
    )
}

export default Post
