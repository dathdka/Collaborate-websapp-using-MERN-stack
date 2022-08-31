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
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2 - 610;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = '1350px';
    canvas.style.height = '100vh';

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
    console.log(context)
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = (event) => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  const chaning = (event) => {
    console.log(event);
  };
  return (
    <MainContainer>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        onChange={chaning}
      />
    </MainContainer>
  );
};

export default Drawing;
