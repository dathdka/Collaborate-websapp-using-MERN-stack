import React from 'react';
import store from '../../store/store';
import { setMessages } from '../../store/actions/chatActions';

const updateDirectChatHistory = (data) => {
    const {participants, messages} = data;
    const receiverId = store.getState().chat.chosenChatDetails?.id;
    const userId = store.getState().auth.userDetails._id;
    if(receiverId && userId){
        const userInConversation = [receiverId, userId];
        updateChatHistory({participants, userInConversation, messages});
    }
    return (
        <div>
            
        </div>
    );
};

const updateChatHistory= ({
    participants, userInConversation, messages
}) => {
    const result = participants.every(function(participantId) {
        return userInConversation.includes(participantId);
    })
    if(result){
        store.dispatch(setMessages(messages));
    }
}

export default updateDirectChatHistory;