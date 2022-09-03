import { drawActions } from "../actions/drawAction";
import { BLANK_BOARD } from "../../Dashboard/Draw/BLANK_BOARD";
const initState = {
  data: null,
  collection: [],
  isChat: true,
  isDraw: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case drawActions.SET_DRAW:
      return {
        ...state,
        data: action.data,
      };
    case drawActions.SET_NEW_BOARD:
      return {
        ...state,
        data: action.data,
      };
    case drawActions.SET_IS_CHAT:
      return {
        ...state,
        isChat: action.isChat,
        isDraw: action.isDraw,
      };
    case drawActions.SET_IS_DRAW:
      return {
        ...state,
        isChat: action.isChat,
        isDraw: action.isDraw,
      };
    case drawActions.SET_COLLECTION:
      return{
        ...state,
        collection: action.collection
      }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
