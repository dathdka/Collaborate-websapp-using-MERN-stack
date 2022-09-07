import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Button } from "@mui/material";
import board from './BOARD';
import {connect} from 'react-redux';
import { sendDataCanvas } from "../../RealtimeCommunication/socketConnection";
import store from "../../store/store";
import { setDraw } from "../../store/actions/drawAction";
const Fabric = ({data, id, push, chosenChatDetails}) => {
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
    if(push){
      var result = JSON.parse(data)
      result.objects.push(push);
      // console.log(result);
      canvas.loadFromJSON(result);
      store.dispatch(setDraw({_id: id, data: JSON.stringify(result)}))
    }
    else if(data){
      var result = JSON.parse(data)
      // console.log(result);
      canvas.loadFromJSON(result);
      //push data from server to canvas
      // console.log(result.objects)
      // result.objects.push(result.objects.at(-1))
      // console.log(result.objects)
      // canvas.loadFromJSON(JSON.stringify(result))
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
        // console.log(canvas.toJSON().objects.at(-1));
        sendDataCanvas({ image : canvas.toJSON().objects.at(-1), receiverId: chosenChatDetails.id, canvasId: id});
      });
  }, [push]);

  return (
    <>
      <canvas id="canv" width={1200} height={755} />
    </>
  );
};

const mapStoreStateToProps = ({draw, chat}) =>{
  return{
    ...draw,
    ...chat
  }
}

export default connect(mapStoreStateToProps) (Fabric);
