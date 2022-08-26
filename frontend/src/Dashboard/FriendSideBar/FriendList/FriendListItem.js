import React from "react";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes, getActions } from "../../../store/actions/chatActions";
import {connect} from 'react-redux';

const FriendListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const handlerChooseUser = ()=>{
    setChosenChatDetails({id: id, name: username}, chatTypes.DIRECT)
  }
  return (
    <Button
      onClick={handlerChooseUser}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "yellow",
        position: "relative",
      }}
    >
      <Avatar children={username.substring(0,2)} />
       {username}
       {isOnline  && <OnlineIndicator/>}
    </Button>
  );
};
const mapActionsToProps = (dispatch) =>{
  return {
    ...getActions(dispatch)
  }
};



export default connect(null, mapActionsToProps) (FriendListItem);
