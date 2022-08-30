import { chatActions } from "../actions/chatActions";
const initState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
  isChat: true,
  isDraw: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: [],
      };
    case chatActions.SET_MESSAGES:
        return{
            ...state,
            messages : action.messages
        };
    case chatActions.SET_IS_CHAT:
        return{
          ...state,
          isChat : action.isChat,
          isDraw : action.isDraw
        }
    case chatActions.SET_IS_DRAW:
        return{
          ...state,
          isChat : action.isChat,
          isDraw : action.isDraw
        }
    default:
        return{
            ...state,
        }
  }
};


export default reducer;