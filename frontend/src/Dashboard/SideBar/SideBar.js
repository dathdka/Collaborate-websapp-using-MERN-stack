import React from 'react';
import {styled} from '@mui/system';
import MainPageButton from './MainPageButton';
import CreateRoomButton from './CreateRoomButton'
const MainContainer = styled('div')({
    width: "70px",
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#36393f'
})

const SideBar = () => {
    return (
        <MainContainer>
            <MainPageButton/>
            <CreateRoomButton/>
        </MainContainer>
    );
};

export default SideBar;