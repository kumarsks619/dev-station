import * as actionTypes from '../actionTypes/post'
import { alertSet } from '../actions/alert'
import axiosInstance from '../../utils/axiosInstance'

// Get all posts
export const postGetAll = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('api/posts')

        dispatch({
            type: actionTypes.POST_GET_ALL,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Like or Unlike a post
export const postUpdateLike = (postID, unlike = false) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.patch(
            unlike ? `api/posts/${postID}/unlike` : `api/posts/${postID}/like`
        )

        dispatch({
            type: actionTypes.POST_UPDATE_LIKE,
            payload: { postID, likes: data },
        })
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Delete a post
export const postDelete = (postID) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/api/posts/${postID}`)

        dispatch({
            type: actionTypes.POST_DELETE,
            payload: postID,
        })

        dispatch(alertSet('Post Removed', 'success'))
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Create a post
export const postCreate = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const { data } = await axiosInstance.post(`/api/posts`, formData, config)

        dispatch({
            type: actionTypes.POST_CREATE,
            payload: data,
        })

        dispatch(alertSet('Post Created', 'success'))
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Get a post by postID
export const postGetByID = (postID) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get(`api/posts/${postID}`)

        dispatch({
            type: actionTypes.POST_GET_ONE,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Add a comment
export const postAddComment = (postID, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const { data } = await axiosInstance.patch(
            `/api/posts/${postID}/comment`,
            formData,
            config
        )

        dispatch({
            type: actionTypes.POST_ADD_COMMENT,
            payload: data,
        })

        dispatch(alertSet('Comment Added', 'success'))
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Delete a comment
export const postDeleteComment = (postID, commentID) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.delete(
            `/api/posts/${postID}/comment/${commentID}`
        )

        dispatch({
            type: actionTypes.POST_REMOVE_COMMENT,
            payload: data,
        })

        dispatch(alertSet('Comment Removed', 'success'))
    } catch (err) {
        dispatch({
            type: actionTypes.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}
