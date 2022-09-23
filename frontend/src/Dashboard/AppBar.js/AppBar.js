import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import DropDownMenu from "./DropDownMenu";
import { connect } from "react-redux";
import BrushIcon from "@mui/icons-material/Brush";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDrawActions } from "../../store/actions/drawAction";

// import { createBlankBoard} from '../../store/actions/drawAction';
const MainContainer = styled("div")({
  position: "absolute",
  left: '295px',
  right: "0",
  top: "0",
  height: "50px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "calc(100% - 295px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});

const AppBar = ({
  chosenChatDetails,
  setIsDraw,
  setIsChat,
  isChat,
  isDraw,
  createBlankBoard,
  data,
  getCollection
}) => {
  const newBoard = () => {
    createBlankBoard({ receiverId: chosenChatDetails.id });
    // createNewBoard({receiverId:chosenChatDetails.id});
  };

  const draw = () => {
    setIsDraw();
    // console.log("draw mode");
  };
  const chat = () => {
    getCollection({ receiverId: chosenChatDetails.id });
    setIsChat({isChat: true, isDraw:false});
    // console.log("chat mode");
  };
  
  const setBack = () =>{
    setIsChat({isChat: false, isDraw: true});
  }

  return (
    <MainContainer>
      <DropDownMenu />
      {isDraw && chosenChatDetails && (
        <div>
          <ChatIcon style={{ backgroundColor: "#36393f" }} onClick={chat} />
          <AddIcon onClick={newBoard} />
          {data &&<ArrowBackIcon onClick = {setBack}/>}
        </div>
      )}
      {isChat && chosenChatDetails && (
        <div>
          <BrushIcon style={{ backgroundColor: "#36393f" }} onClick={draw} />
        </div>
      )}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat, draw }) => {
  return {
    ...chat,
    ...draw,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    ...getDrawActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(AppBar);
