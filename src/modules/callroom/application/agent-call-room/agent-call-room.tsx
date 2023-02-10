/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {toast} from 'react-toastify';
import { format } from 'date-fns';
import type OT from '@opentok/client';
import { unionBy } from 'lodash';
import {useScrollToBottom} from 'react-scroll-to-bottom';
import { opentokConfig } from '@/config/opentok';
import { symblConfig } from '@/config/symbl';
import { AgentCallRoomView } from './agent-call-room.view';


const LIVE_MESSAGE = {id: '12345', transcript: '', sentiment: 'none', isLive: true, from: 'Agent'};
const SYMBL_SOCKET_URL = `wss://api.symbl.ai/v1/streaming/${symblConfig.SESSION_ID}?access_token=${symblConfig.ACCESS_TOKEN}`;
const AGENT_USER_ID = 'fahad.mahmoood@agilityfeat.com';

export const AgentCallRoom = function AgentCallRoom() {
    const [isStreamSubscribed, setIsStreamSubscribed] = useState(false);
    const [conversationId, setConversationId] = useState();
    const [symblMessages, setSymblMessages] = useState([]);
    const [customerQuestionInsights, setCustomerQuestionInsights] = useState<string[]>([]);
    const questionInsightsRef = useRef<string[]>([]);
    const symblSocketRef = useRef<undefined | WebSocket>();
    const otSessionRef = useRef<any>();
    const symblMessageRef = useRef<any>([]);
    const router = useRouter();
    const scrollToBottom = useScrollToBottom();

      

    const addCustomerQuestionInsight = (question: string) => {
      questionInsightsRef.current = [...questionInsightsRef.current, question];
      setCustomerQuestionInsights(questionInsightsRef.current);
    }

    const getMessageAuthor = (userId) => {
      if(userId === AGENT_USER_ID) return 'Agent';
      return 'Customer';
    }
    const setSymblMessageResponse = (messages: any) => {
      const newMessageResponses= messages.map((message: any) =>{
          const messageObject =  {id: message?.id, transcript: message?.payload?.content, sentiment: message?.sentiment?.suggested, from: getMessageAuthor(message.from.userId), time: format(new Date(message?.duration?.endTime), 'h:mm aaa')};
          return messageObject;
          });
          const messageResponsesWithoutLive = symblMessageRef.current.filter((item: any) => item.id !== '12345');
          const uniqueMessageResponses = unionBy(messageResponsesWithoutLive, newMessageResponses, (item) => item.id);
          symblMessageRef.current = [...uniqueMessageResponses, {...LIVE_MESSAGE, time: format(new Date(), 'h:mm aaa')}];
          setSymblMessages(symblMessageRef.current);
    }

    const setLiveTranscript = (message: any) => {
       const liveMessageObject = {...LIVE_MESSAGE, time: format(new Date(), 'h:mm aaa'), transcript: message?.punctuated.transcript, from: getMessageAuthor(message?.user?.email) };
      const messageResponsesWithoutLive = symblMessageRef.current.filter((item: any) => item.id !== '12345');
      symblMessageRef.current =  [...messageResponsesWithoutLive, liveMessageObject];
      setSymblMessages(symblMessageRef.current);
      scrollToBottom();
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
          console.log('message_response: ', data.messages);
          setSymblMessageResponse(data?.messages);
        }

        if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
         console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
          setLiveTranscript(data.message);
        }
        if(data.type === 'message') {
         // console.log('message: ', data.message);
        }

        if (data.type === 'insight_response') {
          console.log('insight response');
          console.log(data);
          for (const insight of data.insights) {
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

<AgentCallRoomView symblMessages={symblMessages} customerQuestionInsights={customerQuestionInsights} onDisconnect={onDisconnect}/>
  );
};
