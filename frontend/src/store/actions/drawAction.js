import { openAlertMessage } from "./alertAction";
import { BLANK_BOARD } from "../../Dashboard/Draw/BLANK_BOARD";
import * as api from "../../api";

export const drawActions = {
  SET_NEW_BOARD: "DRAW.SET_NEW_BOARD",
  SET_DRAW: "DRAW.SET_DRAW",
  SET_IS_CHAT: "SET_IS_CHAT",
  SET_IS_DRAW: "SET_IS_DRAW",
  SET_COLLECTION: "DRAW.SET_COLLECTION",
  SET_BACK: 'DRAW.SET_BACK'
};

export const getDrawActions = (dispatch) => {
  return {
    createBlankBoard: (data) => dispatch(createBlankBoard(data)),
    newBoard: () => dispatch(newBoard()),
    getCollection: (data) => dispatch(getCollection(data)),
    setCollection: (collection) =>dispatch(setCollection(collection)),
    setIsChat: (data) => dispatch(setIsChat(data)),
    setIsDraw: () => dispatch(setIsDraw()),
    selectCollection: (data) => dispatch(selectCollection(data)),
  };
};

const setIsChat = (data) => {
  return {
    type: drawActions.SET_IS_CHAT,
    isChat: data.isChat,
    isDraw: data.isDraw,
  };
};

const setIsDraw = () => {
  return {
    type: drawActions.SET_IS_DRAW,
    isChat: false,
    isDraw: true,
  };
};

const selectCollection = (data) =>{
  setDraw(data);
}

export const createBlankBoard = (data) => {
  return async (dispatch) => {
    const res = await api.createNewBoard(data);
    if (res.error) {
      dispatch(openAlertMessage(res.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("new board has been created"));
      dispatch(newBoard(res));
    }
  };
};

const newBoard = (data) => {
  // console.log(data.data)
  return {
    type: drawActions.SET_NEW_BOARD,
    id: data.data.id,
    data: data.data.data,
  };
};



export const setDraw = (data) => {
  return {
    type: drawActions.SET_DRAW,
    id: data._id,
    data: data.data,
  };
};

export const setCollection = (collection) => {
  if(collection){
    return {
      type: drawActions.SET_COLLECTION,
      collection
    };
  }
  return {
    type: drawActions.SET_COLLECTION,
    collection : []
  };
};

export const getCollection = (data) => {
  return async (dispatch) => {
    // console.log(data)
    const res = await api.getCollection(data);
    if (res.error) {
      dispatch(openAlertMessage(res.exception?.response?.data));
    } else {
      // console.log(res.data.collection);
      dispatch(setCollection(res.data.collection));
    }
  };
};
