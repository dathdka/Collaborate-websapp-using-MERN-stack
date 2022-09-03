

export const chatTypes = {
    DIRECT: 'DIRECT',
    GROUP: 'GROUP',
};

export const chatActions = {
    SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
    SET_MESSAGES: 'CHAT.SET_MESSAGES',
    SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE',
};

export const getActions = (dispatch) =>{
    return {
        setChosenChatDetails: (details, chatType) => dispatch(setChosenChatDetails(details, chatType)),
        setMessages: (messages) => dispatch(setMessages(messages)),

    };
};



const setChosenChatDetails = (details, type)=>{
    return {
        type: chatActions.SET_CHOSEN_CHAT_DETAILS,
        chatType: type,
        chatDetails: details
    };
};

export const setMessages = (messages) =>{
    return {
        type: chatActions.SET_MESSAGES,
        messages
    }
}