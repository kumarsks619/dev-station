import * as actionTypes from '../actionTypes/auth'

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
                ...action.payload,
                isAuth: true,
                isLoading: false,
            }

        case actionTypes.REGISTER_FAIL:
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuth: false,
                isLoading: false,
            }

        default:
            return state
    }
}

export default registerReducer
