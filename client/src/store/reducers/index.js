import { combineReducers } from 'redux'

import alertReducer from '../reducers/alert'

export default combineReducers({
    alert: alertReducer,
})
