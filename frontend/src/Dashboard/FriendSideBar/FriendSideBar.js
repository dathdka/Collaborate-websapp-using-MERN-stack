import React from 'react';
import {styled} from '@mui/system';
import AddFriendButton from './AddFriendButton';
import FriendTitle from './FriendTitle';
import FriendsList from './FriendList/FriendList';
import PendingInvitations from './PendingInvitations/PendingInvitations';

const MainContainer =styled('div')({
    width : '225px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : '#0066cc'
})

const FriendSideBar = () => {
    return (
        <MainContainer>
            <AddFriendButton/>
            <FriendTitle title='Private Messages'/>
            <FriendsList/>
            <FriendTitle title='Invitations' />
            <PendingInvitations />
        </MainContainer>
    );
};

export default FriendSideBar;