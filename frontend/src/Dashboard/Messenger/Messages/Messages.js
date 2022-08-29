import React from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});


const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        const sameAuthor = index > 0 && messages[index].author._id === 
        messages[index - 1].author._id;
        const sameDay = index > 0 && message.date === messages[index-1].date;
        return (
          <div key={message._id} style={{width: '97%'}}>
            {(!sameDay || index === 0) &&(
              <DateSeparator date={message.date}/>
            )}
          <Message
            
            content={message.content}
            username={message.author.username}
            sameAuthor={sameAuthor}
            date={message.date}
            time = {message.time}
            sameDay={sameDay}
          />
          </div>
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};
export default connect(mapStoreStateToProps)(Messages);
