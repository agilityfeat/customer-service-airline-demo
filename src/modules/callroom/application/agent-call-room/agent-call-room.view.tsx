import React from 'react';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { CallSentiments } from '@/components/call-sentiments';
import { QuestionInsights } from '@/components/questionInsights';
import { CallEndButton } from '@/components/buttons/call-end';
import styles from './agent-call-room.module.scss';


interface Props {
  customerQuestionInsights: string[];
  onDisconnect: () => void;
  symblMessages: any;
}

export const AgentCallRoomView = function CalCallRoomViewlRoom(props: Props) {
  const { onDisconnect, customerQuestionInsights, symblMessages } = props;
  return (<>

    <Header/>
    <Main>
    <div className={styles.container}>
    <div className={styles.videos} id="videos">
      <div className={styles.subscriber} id="subscriber"/>
      <div className={styles.publisher} id="publisher"/>
      <div className={styles.callActions}>
        <CallEndButton  onClick={onDisconnect} />
    </div>
    </div>
    <div className={styles.analytics}>
    <QuestionInsights customerQuestionInsights={customerQuestionInsights} />
    <CallSentiments  symblMessages={symblMessages}/>
    </div>
  </div>
    </Main>
    
  </>
  );
};
