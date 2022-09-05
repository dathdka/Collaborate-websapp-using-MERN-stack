import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Button } from "@mui/material";
const Fabric = () => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    var canvas = new fabric.Canvas("canv", {
      width: 1200,
      height: 755,
      backgroundColor: "white",
    });

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#00aeff";
    
    canvas
      .on("mouse:down", function (options) {
        setIsDrawing(true);
      })
      .on("mouse:move", function (options) {
        if (isDrawing) 
          // console.log(options.e.x, options.e.y);
          console.log(canvas.isDrawingMode)
      })
      .on("mouse:up", function (options) {
        setIsDrawing(false)
        console.log(canvas.toJSON().objects);
      });
  }, []);

  const selectMode = () =>{
    setIsDrawing(false);
    console.log(isDrawing)
  }
  const drawMode = () =>{
    setIsDrawing(true);
    console.log(isDrawing)
  }
  return (
    <>
      <canvas id="canv" width={1200} height={755} />
      
      <Button onClick={selectMode}><AccessibleForwardIcon color="red"/></Button>
      <Button onClick={drawMode}> <BathtubIcon color="red"/></Button>
    </>

  );
};

export default Fabric;
