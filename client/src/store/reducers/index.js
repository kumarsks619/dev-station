import { combineReducers } from 'redux'

import alertReducer from '../reducers/alert'
import registerReducer from '../reducers/auth'

export default combineReducers({
    alert: alertReducer,
    auth: registerReducer,
})
