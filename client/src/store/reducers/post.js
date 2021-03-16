import * as actionTypes from '../actionTypes/post'

const initialState = {
    posts: [],
    post: null,
    isLoading: true,
    error: {},
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_GET_ALL:
            return {
                ...state,
                posts: action.payload,
                isLoading: false,
            }

        case actionTypes.POST_GET_ONE:
            return {
                ...state,
                post: action.payload,
                isLoading: false,
            }

        case actionTypes.POST_CREATE:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                isLoading: false,
            }

        case actionTypes.POST_UPDATE_LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload.postID
                        ? { ...post, likes: action.payload.likes }
                        : post
                ),
                isLoading: false,
            }

        case actionTypes.POST_ADD_COMMENT:
        case actionTypes.POST_REMOVE_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: action.payload },
                isLoading: false,
            }

        case actionTypes.POST_DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
                isLoading: false,
            }

        case actionTypes.POST_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

export default postReducer
