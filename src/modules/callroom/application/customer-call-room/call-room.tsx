/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {toast} from 'react-toastify';
import { opentokConfig } from '@/config/opentok';
import { symblConfig } from '@/config/symbl';
import { CallRoomView } from './call-room.view';


const SYMBL_SOCKET_URL = `wss://api.symbl.ai/v1/streaming/${symblConfig.SESSION_ID}?access_token=${symblConfig.ACCESS_TOKEN}`;


export const CallRoom = function CallRoom() {

  const symblSocketRef = useRef<undefined | WebSocket>();
  const otSessionRef = useRef<any>();
  const router = useRouter();

  const startSymblRequest = (symblSocket: WebSocket) => {
    symblSocket.onopen = () => {
      console.log('sending request');
      symblSocket.send(JSON.stringify({
        "type":"start_request",
          "meetingTitle":"AirWebRTC Customer Service",
          "insightTypes":["question","action_item"],  
          "trackers":[
              {
                  "name":"content",
                  "vocabulary": [
                      "flight",
                      "booking",
                      "time",
                      "airline",
                      "city",
                  ]
              }
          ],
          "config":{
              "sentiment": true,
              "confidenceThreshold":0.5,
              "languageCode":"en-US",
              "speechRecognition":{
                  "encoding":"LINEAR16",
                  "sampleRateHertz":44100
              }
          },
          "speaker":{
              "userId":"bey1762@gmail.com",
              "name":"Airline Client"
          }
      }));
    };

    symblSocket.onerror  = (err) => {
      console.error(err);
    };
    
    // Fired when the WebSocket connection has been closed
    symblSocket.onclose = () => {
      console.info('Connection to websocket closed');
    };
  }

  const processSymblStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
      const targetBuffer = new Int16Array(inputData.length);
      for (let index = inputData.length; index > 0; index--) {
          targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
      }
      if(symblSocketRef.current) {
        const ws = symblSocketRef.current;
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(targetBuffer.buffer);
      }
    }
    };
  }
  
  useEffect(() => {
    const symblSocketInstance = new WebSocket(SYMBL_SOCKET_URL);
    symblSocketRef.current = symblSocketInstance;
    startSymblRequest(symblSocketInstance);
  }, []);

  const handleError = (error: OT.OTError | undefined) =>  {
        if (error) {
          alert(error.message);
        }
  }

  const finishCall = () => {
    toast.success('Call Finished!');
    router.push('/');
  }

  const initializeSession = (ot) => {
    const session = ot.initSession(opentokConfig.apiKey, opentokConfig.sessionId);
    otSessionRef.current = session;
    // Subscribe to a newly created stream
    session.on('streamCreated', (event: any) => {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          name: "Agent Name: Mike"
        }, handleError);
      })

    session.on('streamDestroyed', () => {
      finishCall();
    })
  
    // Create a publisher
    const publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
    processSymblStream();
  
    // Connect to the session
    session.connect(opentokConfig.token, (error: any) => {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }

  const onDisconnect = () => {
    if(otSessionRef.current) {
     otSessionRef.current.disconnect();
     finishCall();
    }
}
      
    useEffect(() => {
      const startSession = async() => {
        const ot = (await import('@opentok/client')).default;
        type OT = typeof ot;
        window.OT  = OT;
        initializeSession(ot);
      }
      startSession()
    }, []);

    

  return (

<CallRoomView onDisconnect={onDisconnect}/>
  );
};
