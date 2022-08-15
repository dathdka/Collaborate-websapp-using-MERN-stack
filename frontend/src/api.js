import axios from 'axios';
import { logout } from './shared/utils/auth';
const apiclient = axios.create({
    baseURL: 'http://localhost:1250/api',
    timeout: 10000
});

apiclient.interceptors.request.use((config)=>{
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
        const token = JSON.parse(userDetails).token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(err) =>{
    return Promise.reject(err);
})


export const login = async(data) =>{
    try {
        return await apiclient.post('/auth/login',data);
    } catch (exception) {
        return{
            error: true,
            exception
        };
    }
}; 

export const register = async(data) =>{
    try {
        return await apiclient.post('/auth/register',data);
    } catch (exception) {
        return {
            error: true,
            exception
        }
    }
}

const checkResponseCode = (exception) =>{
    const responseCode = exception?.response?.status;
    if (responseCode ) {
        (responseCode ===401 || responseCode===403) &&logout();
    }
}