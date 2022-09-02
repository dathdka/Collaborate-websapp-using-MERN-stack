import axios from 'axios';
import { logout } from './shared/utils/auth';
import { openAlertMessage } from './store/actions/alertAction';
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

export const sendFriendInvitation = async(data) =>{
    try {
        return await apiclient.post('/friend-invitation/invite', data)
    } catch (exception) {
        checkResponseCode();
        return{
            error : true,
            exception
        }
    }
}

export const acceptFriendInvitation = async (data) =>{
    try {
        return await apiclient.post('/friend-invitation/accept',data);
    } catch (exception) {
        checkResponseCode(exception);
        return {
            error: true,
            exception
        }
    }
}

export const rejectFriendInvitation = async (data) =>{
    try {
        return await apiclient.post('/friend-invitation/reject',data);
    } catch (exception) {
        checkResponseCode(exception);
        return {
            error: true,
            exception
        }
    }
}

export const createNewBoard = async (data) =>{
    try {
        // console.log('api draw')s
        const res = await apiclient.post('/draw/create',data);
        if (res.error) {
            openAlertMessage(res.exception?.response?.data);
          } else {
            console.log('new board has been created')
            // openAlertMessage("new board has been created");
          }
    } catch (exception) {
        checkResponseCode(exception);
        return{
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