import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { PrimaryButton } from '@/components/buttons/primary';
import { symblConfig } from '@/config/symbl';
import { Header } from '../header';
import { Main } from '../main';
import { QuestionInsights } from '../questionInsights';
import { CallSentiments } from '../call-sentiments';

import styles from './index.module.scss';






const TITLE1 = 'Audio Tracks';
const TITLE2 = 'Send text message to customer';
const MESSAGE_PLACEHOLDER = 'Type Message For Customer';
const AGENT_USER_ID = 'fahad.mahmoood@agilityfeat.com';

const AgentSummary = function Home() {
  const [message, setMessage] = useState('');
  const [questions, setCustomerQuestionInsights] = useState([]);
  const [symblMessages, setSymblMessages] = useState([]);
  const router = useRouter();
  const { conversationId } = router.query as { conversationId: string };

  const fetchQuestionInsights = async () => {
      const {data} = await axios.get(`${symblConfig.BASE_URI}/conversations/${conversationId}/questions`, {headers: {'Authorization': `Bearer ${symblConfig.ACCESS_TOKEN}`}});
      if(data?.questions) {
        setCustomerQuestionInsights(data?.questions);
      }
  }


  const getMessageAuthor = (userId: string) => {
    if(userId === AGENT_USER_ID) return 'Agent';
    return 'Customer';
  }

  const fetchMessageResponses= async () => {
    const {data} = await axios.get(`${symblConfig.ACCESS_TOKEN}/conversations/${conversationId}/messages?sentiment=true`, {headers: {'Authorization': `Bearer ${symblConfig.ACCESS_TOKEN}`}});

    if(data?.messages) {
      const newMessageResponses= data.messages.map((messageResponse: any) =>{
        const messageObject =  {id: messageResponse?.id, transcript: messageResponse?.text, sentiment: messageResponse?.sentiment?.suggested, from: getMessageAuthor(messageResponse.from.id), time: format(new Date(messageResponse?.endTime), 'h:mm aaa')};
        return messageObject;
        });
        setSymblMessages(newMessageResponses);
    }
}

  useEffect(() => {
    if(conversationId) {
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