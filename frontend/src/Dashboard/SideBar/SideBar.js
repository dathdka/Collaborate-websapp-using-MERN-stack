import React from 'react';
import {styled} from '@mui/system';
import MainPageButton from './MainPageButton';
const MainContainer = styled('div')({
    width: "70px",
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange'
})

const SideBar = () => {
    return (
        <MainContainer>
            <MainPageButton/>
        </MainContainer>
    );
};

export default SideBar;