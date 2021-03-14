import axiosInstance from './axiosInstance'

const setAuthHeader = (token) => {
    if (token) {
        axiosInstance.defaults.headers.authorization = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.authorization
    }
}

export default setAuthHeader
