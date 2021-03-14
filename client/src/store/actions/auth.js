import * as actionTypes from '../actionTypes/auth'
import * as profileActionTypes from '../actionTypes/profile'
import { alertSet } from '../actions/alert'
import setAuthHeader from '../../utils/setAuthHeader'
import axiosInstance from '../../utils/axiosInstance'

// Load user
export const userLoad = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        setAuthHeader(localStorage.getItem('token'))
    }

    try {
        const { data } = await axiosInstance.get(`/api/auth`)

        dispatch({
            type: actionTypes.USER_LOADED,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: actionTypes.AUTH_ERROR,
        })
    }
}

// Register user
export const userRegister = (userData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const { data } = await axiosInstance.post(`/api/users`, userData, config)

        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: data,
        })

        dispatch(userLoad())
    } catch (err) {
        const { errors } = err.response.data
        let timeout = 4000
        if (errors) {
            errors.forEach((error) => {
                timeout = timeout + 1000
                dispatch(alertSet(error.msg, 'danger', timeout))
            })
        }

        dispatch({
            type: actionTypes.REGISTER_FAIL,
        })
    }
}

// Login user
export const userLogin = (userData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const { data } = await axiosInstance.post(`/api/auth`, userData, config)

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: data,
        })

        dispatch(userLoad())
    } catch (err) {
        const { errors } = err.response.data
        let timeout = 4000
        if (errors) {
            errors.forEach((error) => {
                timeout = timeout + 1000
                dispatch(alertSet(error.msg, 'danger', timeout))
            })
        }

        dispatch({
            type: actionTypes.LOGIN_FAIL,
        })
    }
}

// Logout user - clear everything
export const userLogout = () => (dispatch) => {
    dispatch({
        type: actionTypes.LOGOUT,
    })
    dispatch({
        type: profileActionTypes.PROFILE_CLEAR,
    })
}
