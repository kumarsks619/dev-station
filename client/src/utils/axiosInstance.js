import axios from 'axios'

const SERVER_URL = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
})

export default axiosInstance
