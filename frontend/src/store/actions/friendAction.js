import { openAlertMessage } from "./alertAction";
import * as api from '../../api';
export const friendAction = {
    SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
    SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
    SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS'
};

export const getActions = (dispatch)=>{
    return {
        sendFriendInvitation: (data, closeDialogHandler ) =>dispatch(sendFriendInvitation(data, closeDialogHandler)),
    }
}

export const setPendingFriendsInvitations = (pendingFriendsInvitations) =>{
    return {
        type: friendAction.SET_PENDING_FRIENDS_INVITATIONS,
        pendingFriendsInvitations
    };
};

export const sendFriendInvitation = (data, closeDialogHandler ) =>{
    return async (dispatch) =>{
        const res = await api.sendFriendInvitation(data);
        if(res.error){
            dispatch(openAlertMessage(res.exception?.response?.data));
        }else{
            dispatch(openAlertMessage('invitation has been sent'));
            closeDialogHandler();
        }
    }
}