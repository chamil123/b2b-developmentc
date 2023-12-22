import axios from 'axios';
import store from '@/store';
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
    // baseURL: 'http://127.0.0.1:81/api'
});

axiosClient.interceptors.request.use(config => {
    const token = store.state.token;
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
        // console.log('Authorization header set with token:', token);
    } else {
        console.warn('No token found in Vue store.');
    }
    return config; 
});


export default axiosClient;