import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PrimaryButton } from '@/components/buttons/primary';
import styles from './index.module.scss';


const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjYwNTQzODg5Mzk4ODI0OTYiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiVnl4TjhucXNjcHVodXpOVGhtZ2ZjT0NvS1Y4NlBYR2hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjc1MjY1NTk4LCJleHAiOjE2NzUzNTE5OTgsImF6cCI6IlZ5eE44bnFzY3B1aHV6TlRobWdmY09Db0tWODZQWEdoIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.1oq65ohJ4PlkmOQrOdJ0gjEgC0v3NyHCLdxtcu0uWk2TAYIxGuEXTg7FJzDRYMsGfs-_wHVg32A53YGUgjTLFnKOz-BXetDPa1fPB-3UZ8GD85sLifUzz1GVSMfKO0SdR8frXp-r5-GvAHV--WdpzcAMBrosbjYDS-N7C5XfCIeYwxRzEeO08QTk1ssOmPLKve_iSaY9NRnjOZTiV_oe7diYxT1QITSkH_rU-5f-yOS_0x8S9XK2H1mbyY6llqYIXfjkt_HptIaTcq8auVShZtJomUava8lY4DaU88MFk-Gks7wKY3rqdNKD_EYHw5timkwcDrin6ci-CnBG3Gw6DA';
const BASE_URI = 'https://api.symbl.ai/v1';


const TITLE = 'Call Insights';
const MESSAGE_PLACEHOLDER = 'Type Message For Customer'

const AgentSummary = function Home() {
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState('');
  const router = useRouter();
  const { conversationId } = router.query as { conversationId: string };

  const fetchSummary = async (convId: string) => {
    const {data} = await axios.get(`${BASE_URI}/conversations/${convId}/summary`, {headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`}});
    setSummary(data.summary[0].text);
  };

  useEffect(() => {
    if(conversationId) {
        fetchSummary(conversationId)
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
    <div className={styles.main}>
    <div className={styles.container}>
        <h1 className={styles.heading}>{TITLE}</h1>
    </div>

    <div className={styles.summaryContainer}>
    <h2 className={styles.heading}>Conversation Summary</h2>
    <p>{summary}</p>
    </div>
    <div className={styles.messageContainer}>
    <textarea onChange={onMessageChange} className={styles.textarea} placeholder={MESSAGE_PLACEHOLDER} rows={20} name="comment[text]" id="comment_text" cols={40}  aria-autocomplete="list" aria-haspopup="true" />
    <PrimaryButton onClick={onSendSMS}>Send SMS</PrimaryButton>
    </div>
    </div>

  )
};

export { AgentSummary };