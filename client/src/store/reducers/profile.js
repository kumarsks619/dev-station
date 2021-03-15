import * as actionTypes from '../actionTypes/profile'

const initialState = {
    userProfile: null,
    profiles: [],
    repos: [],
    isLoading: true,
    error: {},
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROFILE_GET:
        case actionTypes.PROFILE_UPDATE:
            return {
                ...state,
                userProfile: action.payload,
                isLoading: false,
            }

        case actionTypes.PROFILE_GET_ALL:
            return {
                ...state,
                profiles: action.payload,
                isLoading: false,
            }

        case actionTypes.PROFILE_GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                isLoading: false,
            }

        case actionTypes.PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }

        case actionTypes.PROFILE_CLEAR:
            return {
                ...state,
                userProfile: null,
                repos: [],
                isLoading: true,
            }

        default:
            return state
    }
}

export default profileReducer
