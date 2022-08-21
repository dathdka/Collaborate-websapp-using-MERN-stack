import { friendAction } from "../actions/friendAction";


const initState = {
    friends: [],
    pendingFriendsInvitations: [],
    onlineUsers: []
} 

const reducer =  (state = initState, action)=>{
    switch (action.type) {
        case friendAction.SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }
        case friendAction.SET_PENDING_FRIENDS_INVITATIONS:
            return{
                ...state,
                pendingFriendsInvitations:action.pendingFriendsInvitations
            }
        case friendAction.SET_ONLINE_USERS:
            return{
                ...state,
                onlineUsers: action.onlineUsers
            }
        default:
            return{
                ...state
            }
    }
}

export default reducer;
