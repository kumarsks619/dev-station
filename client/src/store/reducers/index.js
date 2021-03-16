import { combineReducers } from 'redux'

import alertReducer from '../reducers/alert'
import registerReducer from '../reducers/auth'
import profileReducer from '../reducers/profile'
import postReducer from '../reducers/post'

export default combineReducers({
    alert: alertReducer,
    auth: registerReducer,
    profile: profileReducer,
    post: postReducer,
})
