import { drawActions } from "../actions/drawAction";
import BLANK_BOARD from "../../Dashboard/Draw/BLANK_BOARD";
const initState = {
  board: null,
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
        data: BLANK_BOARD.data,
      };
    default:
      return {
        ...state,
        data: BLANK_BOARD.data,
      };
  }
};
