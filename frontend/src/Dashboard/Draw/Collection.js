import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { getDrawActions } from "../../store/actions/drawAction";
import Button from "@mui/material/Button";
const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#6a6a6a",
  marginTop: "50px",
  display: "flex",
});

const Collection = ({ chosenChatDetails, isDraw, getCollection ,collection}) => {
  useEffect(() => {
    if (chosenChatDetails) {
      console.log(chosenChatDetails.id);
      getCollection({ receiverId: chosenChatDetails.id });
    }
  }, [chosenChatDetails]);
  // console.log(chosenChatDetails);
  return (
    <MainContainer>
        {collection.map(f=>(<Button
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
      > {f.name} </Button>)) }
      
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

export default connect(mapStoreStateToProps, mapActionsToProps)(Collection);
