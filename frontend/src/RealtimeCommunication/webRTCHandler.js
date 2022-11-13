import store  from '../store/store'
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
const onlyAudioConstraints = {
    audio: true,
    video: false,
  };
  
  const defaultConstraints = {
    video: true,
    audio: true,
  };
export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) =>{
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) =>{
        store.dispatch(setLocalStream(stream))
        callbackFunc()
    }).catch(err=>{
        console.error(err);
        //debug incoming connection webRTC
        // callbackFunc()
        console.log('Can not get access to local stream')
    })
}