import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { PrimaryButton } from '@/components/buttons/primary';
import { Header } from '../header';
import { Main } from '../main';
import { QuestionInsights } from '../questionInsights';
import { CallSentiments } from '../call-sentiments';

import styles from './index.module.scss';



const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjYwNTQzODg5Mzk4ODI0OTYiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiVnl4TjhucXNjcHVodXpOVGhtZ2ZjT0NvS1Y4NlBYR2hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjc1OTUyNTAzLCJleHAiOjE2NzYwMzg5MDMsImF6cCI6IlZ5eE44bnFzY3B1aHV6TlRobWdmY09Db0tWODZQWEdoIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Tvo0273gpMCLW36KoTwUJCWeuWiZqe1WyokLfFKKk9n5-q2aahDyNyHBIdg8MqwRqG--hKqVS9JW3QIKDN-zWdtVkP3FgCP7vyl7n-wNCN4xcxFwPSHgFDUnJaAkMwKQpOeL7Ds5o1uFES5-koyrJj4pDJ0f99zsM5O4ynOatA8GKDnuV0Av9A5ZuzJ8hx0iSkn5I3WMnmSrdgjXeFnVDDtYOmKiBw115u99ZhARbk7mDqlAW1YwP-Kx0vYBOXciwlA0k1sOAJLIkuId41Hs9oMy9bjnMcXF1YbaWco4ZqRk9bDwkhGv8ETY8dulyiEWO5jWqaYo62bO5zgVpzFfwg';
const BASE_URI = 'https://api.symbl.ai/v1';


const TITLE1 = 'Audio Tracks';
const TITLE2 = 'Send text message to customer';
const MESSAGE_PLACEHOLDER = 'Type Message For Customer';
const AGENT_USER_ID = 'fahad.mahmoood@agilityfeat.com';

const AgentSummary = function Home() {
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState('');
  const [questions, setCustomerQuestionInsights] = useState([]);
  const [symblMessages, setSymblMessages] = useState([]);
  const router = useRouter();
  const { conversationId } = router.query as { conversationId: string };

  const fetchQuestionInsights = async () => {
      const {data} = await axios.get(`${BASE_URI}/conversations/${conversationId}/questions`, {headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`}});
      if(data?.questions) {
        setCustomerQuestionInsights(data?.questions);
      }
  }


  const getMessageAuthor = (userId: string) => {
    if(userId === AGENT_USER_ID) return 'Agent';
    return 'Customer';
  }

  const fetchMessageResponses= async () => {
    const {data} = await axios.get(`${BASE_URI}/conversations/${conversationId}/messages?sentiment=true`, {headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`}});

    if(data?.messages) {
      const newMessageResponses= data.messages.map((messageResponse: any) =>{
        const messageObject =  {id: messageResponse?.id, transcript: messageResponse?.text, sentiment: messageResponse?.sentiment?.suggested, from: getMessageAuthor(messageResponse.from.id), time: format(new Date(messageResponse?.endTime), 'h:mm aaa')};
        return messageObject;
        });
        setSymblMessages(newMessageResponses);
    }
}
  const fetchSummary = async () => {
    const {data} = await axios.get(`${BASE_URI}/conversations/${conversationId}/summary`, {headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`}});
    setSummary(data.summary[0].text);
  };

  useEffect(() => {
    if(conversationId) {
        fetchSummary()
        fetchQuestionInsights();
        fetchMessageResponses();
    }
  }, [conversationId]);

  const onSendSMS = async () => {
    if(message.trim().length === 0) {
        toast.warn('Please type message!');
    }
    else {
    try {
    await axios.post('/api/sms', {message});
    toast.success('Message sent succesfully!');
    }
    catch(err) {
        toast.error("Error sending message!");
    }
    }
  };

  const onMessageChange = (e: any) => {
    setMessage(e.target.value);
  }
 
  return (
    <>
    <Header/>
    <Main>
    <div className={styles.container}>
      <div className={styles.firstSection}>
       <h3 className={styles.heading}>{TITLE1}</h3>
       <div>
        <p className={styles.graphText}>Agent</p>
        <Image height={60} width={600} alt='audio track' src='/assets/track1.svg' />
       </div>
       <div>
        <p className={styles.graphText}>Customer</p>
        <Image height={60} width={600} alt='audio track' src='/assets/track1.svg' />
       </div>
       <h3 className={styles.heading}>{TITLE2}</h3>
       <div className={styles.messageContainer}>
       <textarea onChange={onMessageChange} className={styles.textarea} placeholder={MESSAGE_PLACEHOLDER} rows={20} name="comment[text]" id="comment_text" cols={40}  aria-autocomplete="list" aria-haspopup="true" />
    <PrimaryButton onClick={onSendSMS}>Send SMS</PrimaryButton>
      </div>
      </div>
      <div className={styles.secondSection}>
        <QuestionInsights customerQuestionInsights={questions} />
        <CallSentiments symblMessages={symblMessages} />
      </div>
    </div>
    </Main>

</>
  )
};

export { AgentSummary };