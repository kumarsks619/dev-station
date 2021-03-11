import { v4 } from 'uuid'

import * as actionTypes from '../actionTypes/alert'

export const alertSet = (msg, alertType, timeout = 5000) => (dispatch) => {
    const ID = v4()
    dispatch({
        type: actionTypes.ALERT_SET,
        payload: { ID, msg, alertType },
    })

    setTimeout(
        () =>
            dispatch({
                type: actionTypes.ALERT_REMOVE,
                payload: ID,
            }),
        timeout
    )
}
