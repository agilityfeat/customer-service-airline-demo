import React from 'react';
import { SentimentMeter } from '@/components/sentimentMeter';
import { QuestionInsights } from '@/components/questionInsights';
import { CallEndButton } from '@/components/buttons/call-end';
import styles from './agent-call-room.module.scss';


interface Props {
  agentSentiment: number;
  customerSentiment: number;
  customerQuestionInsights: string[];
  onDisconnect: () => void;
}

const CUSTOMER_SENTIMENT_TITLE = 'Customer Sentiment';

export const AgentCallRoomView = function CalCallRoomViewlRoom(props: Props) {
  const { agentSentiment, customerSentiment, onDisconnect, customerQuestionInsights} = props;
  return (
    <div className={styles.container}>
    <div className={styles.videos} id="videos">
      <div className={styles.subscriber} id="subscriber"/>
      <div className={styles.publisher} id="publisher"/>
      <div className={styles.callActions}>
        <CallEndButton  onClick={onDisconnect} />
    </div>
    </div>
    <div className={styles.analytics}>
    <h2 className={styles.heading}>Symentic Analysis</h2>
    <div className={styles.sentimentContainer}>
      <SentimentMeter value={agentSentiment}/>
      <SentimentMeter title={CUSTOMER_SENTIMENT_TITLE} value={customerSentiment}/>
    </div>
    <QuestionInsights customerQuestionInsights={customerQuestionInsights} />
    </div>
  </div>
      
  );
};
