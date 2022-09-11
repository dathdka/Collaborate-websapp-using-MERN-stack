import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendSideBar from "./FriendSideBar/FriendSideBar";
import Messenger from "./Messenger/Messenger";
import Draw from "./Draw/Draw";
import AppBar from "./AppBar.js/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../RealtimeCommunication/socketConnection";
import { Socket } from "socket.io-client";
import Collection from "./Draw/Collection";
import Fabric from "./Draw/Fabric";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  backgroundColor: "#6a6a6a",
});

const DashBoard = ({ setUserDetails, isChat, isDraw, id, data }) => {
  // console.log(data);
  const [draw, setDraw] = useState(false)
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);
  useEffect(()=>{
    if(id)
      setDraw(true);
    else
      setDraw(false)
  },[id])

  return (
    <Wrapper key='uniqueKey'>
      <SideBar />
      <FriendSideBar />

      {isChat ? 
        <Messenger />
       : 
         <div>{draw ? <Fabric /> : <Collection />}</div>
      }
      <AppBar />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
const mapStoreStateToProps = ({ chat, draw }) => {
  return {
    ...chat,
    ...draw,
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(DashBoard);
