import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/system";
import { Whiteboard } from "whiteboard-react";
const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "white",
  marginTop: "50px",
  display: "flex",
});
const Draw = () => {
  // const change = (event) =>{
  //     console.log('the board is changing');
  //     console.log(event.objects);
  //     localStorage.setItem('draw', JSON.stringify(event));
  //     console.log(JSON.parse(localStorage.getItem('draw')));
  //     canvas.loadFromJSON(JSON.parse(localStorage.getItem('draw')));
  // }
  
  return (
    <MainContainer>

    </MainContainer>
  );
};

export default Draw;
