import * as actionTypes from '../actionTypes/alert'

const initialState = []

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALERT_SET:
            return [...state, action.payload]

        case actionTypes.ALERT_REMOVE:
            return state.filter((alert) => alert.ID !== action.payload)

        default:
            return state
    }
}

export default alertReducer
