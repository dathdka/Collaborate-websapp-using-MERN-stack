import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { getDrawActions, setDraw } from "../../store/actions/drawAction";
import Button from "@mui/material/Button";
import store from "../../store/store";
const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#6a6a6a",
  marginTop: "50px",
  display: "flex",
});

const Collection = ({ chosenChatDetails, isDraw, getCollection ,collection, selectCollection}) => {
  useEffect(() => {
    if (chosenChatDetails) {
      // console.log(chosenChatDetails.id);
      getCollection({ receiverId: chosenChatDetails.id });
    }
  }, [chosenChatDetails]);
  // console.log(chosenChatDetails);
  const select = (_id, data) =>{
    // console.log(_id)
    // console.log(data)
    store.dispatch(setDraw({_id,data}));
  }
  return (
    <MainContainer>
      <table>
        {collection.map(f=>(<tr><Button
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
        onClick = {() => select(f._id,f.data)}
      >{f.name} </Button></tr>)) }
      </table>
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
