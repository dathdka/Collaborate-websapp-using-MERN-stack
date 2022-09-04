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
import Collection from "./Draw/Collection";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  backgroundColor: '#6a6a6a'

});
const DashBoard = ({ setUserDetails , isChat, isDraw, data}) => {
  // console.log(data);
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <FriendSideBar />
      {isChat ? <Messenger /> : <> {data ? <Draw />: <Collection/>}</>}
      
      <AppBar />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
const mapStoreStateToProps = ({chat , draw}) =>{
  return{
    ...chat,
    ...draw
  }
}
export default connect(mapStoreStateToProps, mapActionsToProps)(DashBoard);
