import React from "react";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";

const FriendListItem = ({ id, username, isOnline }) => {
  return (
    <Button
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar children={username.substring(0,2)} />
       {username}
       {isOnline  && <OnlineIndicator/>}
    </Button>
  );
};

export default FriendListItem;
