import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Button } from "@mui/material";
import board from './BOARD';
const Fabric = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  var data = localStorage.getItem('canvas');
  useEffect(() => {
    var canvas = new fabric.Canvas("canv", {
      width: 1200,
      height: 755,
      backgroundColor: "white",
    });

    canvas.loadFromJSON(board);
    console.log(board);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#00aeff";
    if(data){
      //push data from server to canvas
      var result = JSON.parse(data)
      console.log(result.objects)
      result.objects.push(result.objects.at(-1))
      console.log(result.objects)
      canvas.loadFromJSON(JSON.stringify(result))
    }
    canvas
    .on("mouse:down", function (options) {
        setIsDrawing(true);
      })
      .on("mouse:move", function (options) {
        if (isDrawing) 
          console.log(canvas.isDrawingMode)
      })
      .on("mouse:up", function (options) {
        setIsDrawing(false)

        // localStorage.setItem('canvas',JSON.stringify(canvas.toJSON()));
        // console.log(canvas.toJSON().objects);
      });
  }, []);

  return (
    <>
      <canvas id="canv" width={1200} height={755} />
    </>

  );
};

export default Fabric;
