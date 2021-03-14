import { alertSet } from './alert'
import * as actionTypes from '../actionTypes/profile'
import axiosInstance from '../../utils/axiosInstance'

// Get current user's profile
export const profileGetCurrent = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/api/profiles/me')

        dispatch({
            type: actionTypes.PROFILE_GET,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Create or update profile
export const profileCreateUpdate = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.post('/api/profiles', formData, config)

        dispatch({
            type: actionTypes.PROFILE_GET,
            payload: data,
        })

        dispatch(alertSet(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        history.push('/dashboard')
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
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Add experience or education
export const profileAddExpEdu = (formData, history, education = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axiosInstance.patch(
            education ? '/api/profiles/education' : '/api/profiles/experience',
            formData,
            config
        )

        dispatch({
            type: actionTypes.PROFILE_UPDATE,
            payload: data,
        })

        dispatch(alertSet(education ? 'Education Added' : 'Experience Added', 'success'))

        history.push('/dashboard')
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
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Delete experience or education
export const profileDeleteExpEdu = (ID, education = false) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.delete(
            education ? `/api/profiles/education/${ID}` : `/api/profiles/experience/${ID}`
        )

        dispatch({
            type: actionTypes.PROFILE_UPDATE,
            payload: data,
        })

        dispatch(
            alertSet(education ? 'Education Removed' : 'Experience Removed', 'success')
        )
    } catch (err) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}

// Delete account
export const accountDelete = () => async (dispatch) => {
    const confirm = window.prompt(
        'Are you sure? This cannot be UNDONE! \n Type "DELETE" to confirm.'
    )

    if (confirm === 'DELETE') {
        try {
            await axiosInstance.delete('/api/profiles')

            dispatch({ type: actionTypes.PROFILE_CLEAR })
            dispatch({ type: actionTypes.ACCOUNT_DELETE })

            dispatch(alertSet('Your account has been permanently deleted'))
        } catch (err) {
            dispatch({
                type: actionTypes.PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status },
            })
        }
    }
}
