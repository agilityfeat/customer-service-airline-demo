import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { PrimaryButton } from '@/components/buttons/primary';
import { symblConfig } from '@/config/symbl';
import classNames from 'classnames';
import { Header } from '../header';
import { Main } from '../main';
import { QuestionInsights } from '../questionInsights';
import { CallSentiments } from '../call-sentiments';
import { Summary } from '../summary';
import styles from './index.module.scss';

const TITLE1 = 'Audio Tracks';
const TITLE2 = 'Send text message to customer';
const MESSAGE_PLACEHOLDER = 'Type Message For Customer';
const AGENT_USER_ID = 'fahad.mahmoood@agilityfeat.com';
const AXIOS_OPTIONS = {headers: {'Authorization': `Bearer ${symblConfig.ACCESS_TOKEN}`}};

const fetcher = (url: string) => axios.get(url, AXIOS_OPTIONS).then(res => res.data)


const AgentSummary = function Home() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { conversationId } = router.query as { conversationId: string };
  const { data: questionsData, isLoading: questionsLoading } = useSWR(conversationId ? `${symblConfig.BASE_URI}/conversations/${conversationId}/questions` : null, fetcher)
  const { data: messagesData, isLoading: messageResponsesLoading } = useSWR(conversationId ? `${symblConfig.BASE_URI}/conversations/${conversationId}/messages?sentiment=true` : null, fetcher)
  const { data: summaryData, isLoading: summaryLoading } = useSWR(conversationId ? `${symblConfig.BASE_URI}/conversations/${conversationId}/summary` : null, fetcher);


  const getMessageAuthor = (userId: string) => {
    if(userId === AGENT_USER_ID) return 'Agent';
    return 'Customer';
  }

const symblMessages =  useMemo(() => {
  if(messagesData && messagesData.messages) {
    const newMessageResponses= messagesData?.messages.map((messageResponse: any) =>{
      const messageObject =  {id: messageResponse?.id, transcript: messageResponse?.text, sentiment: messageResponse?.sentiment?.suggested, from: getMessageAuthor(messageResponse.from.id), time: format(new Date(messageResponse?.endTime), 'h:mm aaa')};
      return messageObject;
      });
      return newMessageResponses;
  }
  return [];

}, [messagesData]);

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
        <div className={styles.avatarContainer1}>
          <div>
            <div className={classNames(styles.dot, styles.neutral)}/>
            <div className={classNames(styles.dot, styles.neutral)}/>
          </div>
          <div className={styles.middleAvatar1}>
          <div className={classNames(styles.dot, styles.positive)}/>
          <div className={classNames(styles.dot, styles.positive)}/>
          <div className={classNames(styles.dot, styles.positive)}/>
          </div>
          <div>
          <div className={classNames(styles.dot, styles.neutral)}/>
            <div className={classNames(styles.dot, styles.neutral)}/>
          </div>
        </div>
       </div>
       <div>
        <p className={styles.graphText}>Customer</p>
        <Image height={60} width={600} alt='audio track' src='/assets/track2.svg' />
        <div className={styles.avatarContainer1}>
          <div>
            <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.negative)}/>
          </div>
          <div className={styles.middleAvatar2}>
          <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.negative)}/>
            <div className={classNames(styles.dot, styles.neutral)}/>
            <div className={classNames(styles.dot, styles.neutral)}/>
          </div>
          <div>
          <div className={classNames(styles.dot, styles.positive)}/>
          </div>
        </div>
       </div>
       <h3 className={styles.heading}>{TITLE2}</h3>
       <div className={styles.messageContainer}>
       <textarea onChange={onMessageChange} className={styles.textarea} placeholder={MESSAGE_PLACEHOLDER} rows={20} name="comment[text]" id="comment_text" cols={40}  aria-autocomplete="list" aria-haspopup="true" />
    <PrimaryButton onClick={onSendSMS}>Send SMS</PrimaryButton>
      </div>
      </div>
      <div className={styles.secondSection}>
        <Summary data={summaryData ?? []} isLoading={summaryLoading} />
        <QuestionInsights customerQuestionInsights={questionsData?.questions ?? []}  isLoading={questionsLoading}/>
        <CallSentiments symblMessages={symblMessages} isLoading={messageResponsesLoading} />
      </div>
    </div>
    </Main>

</>
  )
};

export { AgentSummary };