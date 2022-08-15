import * as api from '../../api';
import { openAlertMessage } from './alertAction';

export const authAction = {
    SET_USER_DETAIL: 'AUTH.SET_USER_DETAILS'
}; 

export const getActions = (dispatch)=>{
    return {
        login:(userDetails, navigate) => dispatch(login(userDetails, navigate)),
        register: (userDetails, navigate) => dispatch(register(userDetails, navigate)),
        setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails))
    }
}

const setUserDetails = (userDetails) =>{
    return{
        type: authAction.SET_USER_DETAIL,
        userDetails
    }
}

const login = (userDetails, navigate) =>{
    return async (dispatch) =>{
        const response = await api.login(userDetails);
        console.log(response);
        if(response.error){
            console.log('loi');
            dispatch(openAlertMessage(response?.exception?.response?.data))
        }else{
            console.log('ko loi');
            const userDetails = response?.data;
            localStorage.setItem('user', JSON.stringify(userDetails));
            dispatch(setUserDetails(userDetails));
            navigate('/dashboard');
        }
    }
}

const register = (userDetails, navigate) =>{
    return async (dispatch) =>{
        const response = await api.register(userDetails);
        console.log(response);
        if(response.error){
            dispatch(openAlertMessage(response?.exception?.response?.data))
        }else{
            const {userDetails} = response?.data;
            localStorage.setItem('user', JSON.stringify(userDetails));
            dispatch(setUserDetails(userDetails));
            navigate('/dashboard');
        }
    }
}