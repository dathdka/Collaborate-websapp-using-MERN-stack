import React from 'react';
import {styled} from '@mui/system';
import MainPageButton from './MainPageButton';
import CreateRoomButton from './CreateRoomButton'
import ActiveRoomButton from "./ActiveRoomButton";
import { connect } from "react-redux";

const MainContainer = styled('div')({
    width: "70px",
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#36393f'
})

const SideBar = ({ activeRooms, isUserInRoom }) => {
    console.log(activeRooms)
    return (
      <MainContainer>
        <MainPageButton />
        <CreateRoomButton isUserInRoom={isUserInRoom} />
        {activeRooms.map((room) => (
          <ActiveRoomButton
            roomId={room.roomId}
            creatorUsername={room.creatorUsername}
            amountOfParticipants={room.participants.length}
            key={room.roomId}
            isUserInRoom={isUserInRoom}
          />
        ))}
      </MainContainer>
    );
  };

const mapStoreStateToProps = ({room}) =>{
    return {
        ...room
    };
};

export default connect(mapStoreStateToProps)(SideBar);