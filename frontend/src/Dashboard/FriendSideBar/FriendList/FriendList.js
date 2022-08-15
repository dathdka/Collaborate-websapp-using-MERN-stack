import React from "react";
import { styled } from "@mui/system";
import FriendListItem from "./FriendListItem";

const DUMMY_FRIENDS = [
  {
    id: 1,
    username: "Mark",
    isOnline: true,
  },
  {
    id: 2,
    username: "Anna",
    isOnline: false,
  },
  {
    id: 3,
    username: "John",
    isOnline: false,
  },
];


const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendList = () => {
  return <MainContainer>
    {DUMMY_FRIENDS.map(f=>(
      <FriendListItem username={f.username}
      id = {f.id}
      key = {f.id}
      isOnline = {f.isOnline}/>
    ))}
  </MainContainer>;
};

export default FriendList;
