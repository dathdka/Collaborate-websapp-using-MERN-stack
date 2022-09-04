import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/system";
import { sendDataCanvas } from "../../RealtimeCommunication/socketConnection";
import { connect } from 'react-redux';

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "white",
  marginTop: "50px",
  display: "flex",
});
const Draw = ({chosenChatDetails, id,data}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2 - 590;
    canvas.height = window.innerHeight * 2 - 100;
    canvas.style.width = `${window.innerWidth - 295}px`;
    canvas.style.height = `${window.innerHeight - 50}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
    var image = new Image();
    image.onload = function (){
      context.clearRect(0,0,canvas.width,canvas.height );
      context.drawImage(image,0,0,window.innerWidth*2,window.innerHeight*2,0,0,window.innerWidth,window.innerHeight);
    }
    image.src = data;
  }, [id, data]);


  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    const data = document.getElementById('canvas').toDataURL();
    sendDataCanvas({ image : data, receiverId: chosenChatDetails.id, canvasId: id});
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <MainContainer>
      <canvas id="canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({chat,draw}) =>{
  return {
    ...chat,
    ...draw
  }
}

export default connect(mapStoreStateToProps) (Draw);
