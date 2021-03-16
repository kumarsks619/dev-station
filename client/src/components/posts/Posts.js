import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postGetAll } from '../../store/actions/post'
import Loader from '../layout/Loader'
import PostForm from './PostForm'
import PostItem from './PostItem'

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, isLoading } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(postGetAll())
    }, [dispatch])

    return (
        <>
            <h1 className="large text-primary">Timeline</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
            </p>

            <PostForm />

            <div className="posts">
                {isLoading ? (
                    <Loader />
                ) : posts.length > 0 ? (
                    posts.map((post) => <PostItem key={post._id} post={post} />)
                ) : (
                    <h4>Seems like timeline is empty...</h4>
                )}
            </div>
        </>
    )
}

export default Posts
