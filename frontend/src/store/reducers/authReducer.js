import { authAction } from '../actions/authActions';
const initState = {
    userDetails : null
}

const reducer = (state = initState, action)=>{
    switch(action.type){
        case authAction.SET_USER_DETAIL: 
            return {
                ...state,
                userDetails: action.userDetails,
                
            };
        default:
            return state;
    }
}

export default reducer;