import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import DropDownMenu from "./DropDownMenu";
import { connect } from "react-redux";
import FriendListItem from "../FriendSideBar/FriendList/FriendListItem";
const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "calc(100% - 326px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});

const AppBar = ({chosenChatDetails}) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [isOnline, setIsOnline] = useState(false);
  //const { name, id } = props.chat.chosenChatDetails;
  useEffect(() =>{
    if(chosenChatDetails ){
        setName(chosenChatDetails.name);
        setId(chosenChatDetails.id);
    }
  }, [chosenChatDetails]);
  return (
    <MainContainer>
      <DropDownMenu />
      {name && (
        <FriendListItem username={name} id={id} key={id} isOnline= {isOnline} />
      )}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({chat}) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(AppBar);
