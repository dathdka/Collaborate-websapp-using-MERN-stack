import React from "react";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  width: "97%",
  display: "flex",
  marginTop: "10px",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
});

const MessageContent = styled("div")({
  color: "#DCDDDE",
  float: "left",
});

const SameAuthorMessageContent = styled("div")({
  color: "#DCDDDE",
  width: "97%",
});

const SameAuthorMessageText = styled("span")({
  marginLeft: "70px",
});
const Me = styled("div")({
  color: "yellow",
});
const Friend = styled("div")({
  color: "pink",
});

const Message = ({
  content,
  sameAuthor,
  username,
  date,
  sameDay,
  userDetails,
}) => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes();
  const name = userDetails.username;
  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent>
        {username === name ? (
          <Me>
            <SameAuthorMessageText>{content}</SameAuthorMessageText>
          </Me>
        ) : (
          <Friend>
            <SameAuthorMessageText>{content}</SameAuthorMessageText>
          </Friend>
        )}
      </SameAuthorMessageContent>
    );
  }
  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar children={username.substring(0, 2)} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: "16px", color: "white" }}>
          {username}{" "}
          <span style={{ fontSize: "12px", color: "#72767d" }}>{date} - {time}</span>
        </Typography>
        {username === name ? (
          <MessageContent>
            <Me>{content}</Me>
          </MessageContent>
        ) : (
          <MessageContent>
            <Friend>{content}</Friend>
          </MessageContent>
        )}
      </MessageContainer>
    </MainContainer>
  );
};
const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStoreStateToProps)(Message);
