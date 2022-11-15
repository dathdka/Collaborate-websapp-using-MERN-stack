import store from "../store/store";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import Peer from "simple-peer";
import * as socketConnection from './socketConnection'
const getConfiguration = () => {
  const turnIceServers = null;
  if (turnIceServers) {
  } else {
    console.log("using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};
const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};
export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.error(err);
      //debug incoming connection webRTC
      callbackFunc();
      console.log("Can not get access to local stream");
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;
  if (isInitiator) {
    console.log("prepare new peer connection as initiator");
  } else {
    console.log("prepare new peer connection as not initiator");
  }
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });


  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    socketConnection.signalPeerData(signalData)
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    console.log('remote stream came from server')
  });
};

export const handleSignalingData = (data) =>{
  const  {connUserSocketId, signal} = data

  if(peers[connUserSocketId]){
    peers[connUserSocketId].signal(signal)
  }
}
