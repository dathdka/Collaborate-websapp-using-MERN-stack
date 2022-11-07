import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { Button } from "@mui/material";
import board from "./BOARD";
import { connect } from "react-redux";
import { sendDataCanvas } from "../../RealtimeCommunication/socketConnection";
import store from "../../store/store";
import { setDraw } from "../../store/actions/drawAction";
const Fabric = ({ data, id, push, chosenChatDetails }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    var canvas = new fabric.Canvas("canv", {
      width: 1180,
      height: 755,
      backgroundColor: "white",
    });
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#00aeff";
    // var rect = new fabric.Rect({
    //   backgroundColor: "red",
    // });
    // console.log(canvas._objects);
    if (push) {
      // old way
      var result = JSON.parse(data);
      result.objects.push(push);
      // day truc tiep vao canvas;
      canvas.loadFromJSON(result);
      store.dispatch(setDraw({_id: id, data: JSON.stringify(result)}))


      
      //TODO: push single objects into canvas (not done yet)
      // var temp = new fabric.Path(push.path, push);
      // fabric.util.enlivenObjects([push], function(objects) {
      //   var origRenderOnAddRemove = canvas.renderOnAddRemove;
      //   canvas.renderOnAddRemove = false;
      
      //   objects.forEach(function(o) {
      //     canvas.add(o);
      //   });
      
      //   canvas.renderOnAddRemove = origRenderOnAddRemove;
      //   canvas.renderAll();
      // });
      // console.log(canvas._objects);


    } else if (data) {
      var result = JSON.parse(data);
      canvas.loadFromJSON(result);
      console.log(document.getElementById('canv').toDataURL());
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
        if (isDrawing) console.log(canvas.isDrawingMode);
      })
      .on("mouse:up", function (options) {
        setIsDrawing(false);
        // console.log(canvas.toJSON().objects.at(-1));
        sendDataCanvas({
          image: canvas.toJSON().objects.at(-1),
          receiverId: chosenChatDetails.id,
          canvasId: id,
        });
      });
    //TODO: add more feature in fabric (not started yet)
  }, [push]);
  
  return (
    <div>
      <canvas id="canv" width={1200} height={755} />
    </div>
  );
};

const mapStoreStateToProps = ({ draw, chat }) => {
  return {
    ...draw,
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Fabric);
