import React, { useEffect } from "react";
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

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});
const DashBoard = ({ setUserDetails , isChat, isDraw}) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);
  // useEffect(()=>{

  // },[isChat, isDraw])
  return (
    <Wrapper>
      <SideBar />
      <FriendSideBar />
      {isChat ? <Messenger /> : <Draw/>}
      <AppBar />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
const mapStoreStateToProps = (state) =>{
  return{
    ...state.chat,
  }
}
export default connect(mapStoreStateToProps, mapActionsToProps)(DashBoard);
