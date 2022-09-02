import { openAlertMessage } from "./alertAction";
import * as api from "../../api";
import BLANK_BOARD from '../../Dashboard/Draw/BLANK_BOARD';

export const drawActions = {
  SET_NEW_BOARD : 'DRAW.SET_NEW_BOARD',
  SET_DRAW: 'DRAW.SET_DRAW',
};

export const getDrawActions = (dispatch) => {
  return {
    createBlankBoard: (data) => dispatch(createBlankBoard(data)),

  };
};

const createBlankBoard = async (data) => {
  return async (dispatch) => {
    console.log("draw action");
    const res = await api.createNewBoard(data);
    if (res.error) {
      dispatch(openAlertMessage(res.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("new board has been created"));
    }
  };
};

const setDraw = (data) =>{
  return {
    type: drawActions.SET_DRAW,
    data: data.data
  }
}
