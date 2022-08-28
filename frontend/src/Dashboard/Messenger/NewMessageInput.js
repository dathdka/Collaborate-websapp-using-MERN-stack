import React, { useState } from 'react';
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { sendDirectMessage } from '../../RealtimeCommunication/socketConnection';

const MainContainer = styled("div")({
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  
  const Input = styled("input")({
    backgroundColor: "#2f3136",
    width: "98%",
    height: "44px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "0 10px",
  });
const NewMessageInput = ({chosenChatDetails}) => {
    const [message,setMessage] = useState('');
    const handleMessageValueChange = (event) =>{
        setMessage(event.target.value);
    }

    const handleKeyPressed = (event) =>{
        if(event.key === 'Enter' )
            handlerSendMessage();
    }

    const handlerSendMessage = () =>{
        console.log(`${message}`);
        
        if(message.length>0){
          sendDirectMessage({
            receiverUserId: chosenChatDetails.id,
            content : message
          });
          setMessage('');
        }
    }
    return (
        <MainContainer>
            <Input placeholder='chat something...'
            value={message}
            onChange={handleMessageValueChange}
            onKeyDown={handleKeyPressed}
            />
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ chat }) => {
    return {
      ...chat,
    };
  };

export default connect(mapStoreStateToProps)(NewMessageInput);