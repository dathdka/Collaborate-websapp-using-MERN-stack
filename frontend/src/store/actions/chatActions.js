

export const chatTypes = {
    DIRECT: 'DIRECT',
    GROUP: 'GROUP',
};

export const chatActions = {
    SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
    SET_MESSAGES: 'CHAT.SET_MESSAGES',
    SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE',
    SET_IS_CHAT: 'SET_IS_CHAT',
    SET_IS_DRAW: 'SET_IS_DRAW'
};

export const getActions = (dispatch) =>{
    return {
        setChosenChatDetails: (details, chatType) => dispatch(setChosenChatDetails(details, chatType)),
        setMessages: (messages) => dispatch(setMessages(messages)),
        setIsChat: ()=> dispatch(setIsChat()),
        setIsDraw: ()=> dispatch(setIsDraw()),
    };
};

export const setIsChat = () =>{
    return {
        type: chatActions.SET_IS_CHAT,
        isChat: true,
        isDraw: false
    }
}

export const setIsDraw = () =>{
    return {
        type: chatActions.SET_IS_DRAW,
        isChat: false,
        isDraw: true
    }
}

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