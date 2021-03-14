import * as actionTypes from '../actionTypes/auth'
import * as profileActionTypes from '../actionTypes/profile'

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoading: true,
    user: null,
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOADED:
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                user: action.payload,
            }

        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
                isLoading: false,
            }

        case actionTypes.REGISTER_FAIL:
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT:
        case profileActionTypes.ACCOUNT_DELETE:
            localStorage.removeItem('token')
            return {
                token: null,
                isAuth: false,
                isLoading: false,
                user: null,
            }

        default:
            return state
    }
}

export default registerReducer
