/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {toast} from 'react-toastify';
import type OT from '@opentok/client';
import { opentokConfig } from '@/config/opentok';
import { AgentCallRoomView } from './agent-call-room.view';


const SESSION_ID = 'airwebrtc12345';
const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjYwNTQzODg5Mzk4ODI0OTYiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiVnl4TjhucXNjcHVodXpOVGhtZ2ZjT0NvS1Y4NlBYR2hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjc1MjY1NTk4LCJleHAiOjE2NzUzNTE5OTgsImF6cCI6IlZ5eE44bnFzY3B1aHV6TlRobWdmY09Db0tWODZQWEdoIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.1oq65ohJ4PlkmOQrOdJ0gjEgC0v3NyHCLdxtcu0uWk2TAYIxGuEXTg7FJzDRYMsGfs-_wHVg32A53YGUgjTLFnKOz-BXetDPa1fPB-3UZ8GD85sLifUzz1GVSMfKO0SdR8frXp-r5-GvAHV--WdpzcAMBrosbjYDS-N7C5XfCIeYwxRzEeO08QTk1ssOmPLKve_iSaY9NRnjOZTiV_oe7diYxT1QITSkH_rU-5f-yOS_0x8S9XK2H1mbyY6llqYIXfjkt_HptIaTcq8auVShZtJomUava8lY4DaU88MFk-Gks7wKY3rqdNKD_EYHw5timkwcDrin6ci-CnBG3Gw6DA';
const SYMBL_SOCKET_URL = `wss://api.symbl.ai/v1/streaming/${SESSION_ID}?access_token=${ACCESS_TOKEN}`;
const AGENT_USER_ID = 'fahad.mahmoood@agilityfeat.com';

export const AgentCallRoom = function AgentCallRoom() {
    const [isStreamSubscribed, setIsStreamSubscribed] = useState(false);
    const [agentSentiment, setAgentSentiment] = useState(0.0);
    const [customerSentiment, setCustomerSentiment] = useState(0.0);
    const [conversationId, setConversationId] = useState();
    const [customerQuestionInsights, setCustomerQuestionInsights] = useState<string[]>([]);
    const questionInsightsRef = useRef<string[]>([]);
    const symblSocketRef = useRef<undefined | WebSocket>();
    const otSessionRef = useRef<any>();
    const router = useRouter();
      

    const addCustomerQuestionInsight = (question: string) => {
      questionInsightsRef.current = [...questionInsightsRef.current, question];
      setCustomerQuestionInsights(questionInsightsRef.current);
    }

    const setSymblListeners = (symblSocket: WebSocket) => {
     symblSocket.onopen = () => {
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
              "userId": AGENT_USER_ID,
              "name":"Fahad Mahmood"
          }
      }));
    };

      symblSocket.onmessage = (event) => {
        const data: any = JSON.parse(event.data);
        if(data.type === 'message' && data?.message?.data ) {
          setConversationId(data.message.data.conversationId);
        }
        if (data.type === 'message_response') {
          data.messages.forEach((message: any) => {
            console.log(message.sentiment.polarity.score)
            if(message.from.userId !== AGENT_USER_ID) {
              setCustomerSentiment(message.sentiment.polarity.score)
            }
            else {
              setAgentSentiment(message.sentiment.polarity.score);
            }
          })
        }

        if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
          console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
        }

        if (data.type === 'insight_response') {
          console.log('insight response');
          console.log(data);
          for (let insight of data.insights) {
            if(insight.from.userId !== AGENT_USER_ID && insight.type === 'question') {
              addCustomerQuestionInsight(insight.payload.content);
            }
            console.log('Insight detected: ', insight.payload.content);
          }
        }
      };
      
      // Fired when the WebSocket closes unexpectedly due to an error or lost connetion
      symblSocket.onerror  = (err) => {
        console.error(err);
      };
      
      // Fired when the WebSocket connection has been closed
      symblSocket.onclose = () => {
        console.info('Connection to websocket closed');
      };

    };

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
      setSymblListeners(symblSocketInstance);
    }, []);

    const handleError = (error: OT.OTError | undefined) =>  {
        if (error) {
          alert(error.message);
        }
    }

    const finishCall = () => {
      toast.success('Call Finished!');
      console.log(conversationId);
      router.push(`/call-finish/${conversationId}`);
    }

  const initializeSession = (OT) => {
    const session= OT.initSession(opentokConfig.apiKey, opentokConfig.sessionId);
    otSessionRef.current = session;
    // Subscribe to a newly created stream
    session.on('streamCreated', (event: any) => {
      setIsStreamSubscribed(true);
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          name: "Customer ID: 41"
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
        initializeSession(ot);
      }
      startSession()
    }, []);

  
  return (

<AgentCallRoomView customerQuestionInsights={customerQuestionInsights} onDisconnect={onDisconnect} agentSentiment={agentSentiment} customerSentiment={customerSentiment}/>
  );
};
