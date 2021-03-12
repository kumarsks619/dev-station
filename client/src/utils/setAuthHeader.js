import axios from 'axios'

const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.authorization = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.authorization
    }
}

export default setAuthHeader
