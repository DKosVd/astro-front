import axios from 'axios';
import { getCookie } from '../utils/Cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    withCredentials: true
})


export const privateAxios = axios.create({
    baseURL: 'http://localhost:1337/api',
    withCredentials: true,
    headers: {
        Authorization: `bearer ${getCookie('jwt')}`
    }
})

export default axiosInstance;