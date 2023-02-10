import React from 'react';
import Avatar from 'react-avatar';
import ScrollToBottom from 'react-scroll-to-bottom';
import styles from './index.module.scss';



const TITLE = 'Chat Transcript';

interface Props {
    symblMessages: any[];
}

const CallSentiments = function CallSentiments(props: Props) {
  const { symblMessages } = props;
  
  const displaySentiment = (sentiment: string) => {
    if(sentiment === 'negative') {
        return (
        <div className={styles.sentimentContainer}>
         <Avatar className={styles.sentiment} size='14px' round color='#CD0411' />
         <Avatar className={styles.sentiment} size='14px' round color='#CD0411' />
         <Avatar size='14px' round color='#CD0411' />
        </div>
        )
    }

    if (sentiment === 'neutral') {
        return (
            <div className={styles.sentimentContainer}>
            <Avatar className={styles.sentiment} size='14px' round color='#DCC816' />
            <Avatar className={styles.sentiment} size='14px' round color='#DCC816' />
            <Avatar size='14px' round color='#f1f1f1' />
           </div>
        )
    }

    if(sentiment === 'positive') {
        return (
            <div className={styles.sentimentContainer}>
            <Avatar className={styles.sentiment} size='14px' round color='green' />
            <Avatar className={styles.sentiment} size='14px' round color='green' />
            <Avatar size='14px' round color='green' />
           </div>
        )
    }
    return <div></div>;
  }
  const getCallSentiments = () => {
    if(symblMessages.length === 0) {
      return <p className={styles.text}>No Transcript Available!</p>
    }
    return symblMessages.map((symblMessage: any) => {
        if(symblMessage.transcript && symblMessage.transcript !== '') {
            return (
                <div key={symblMessage.id}>
                <div className={styles.firstSection}>
                <p>{symblMessage?.time}</p>
                <p>{symblMessage.from ?? ''}</p>
                </div>
                <div className={styles.secondSection}>
                    <p>{symblMessage?.transcript}</p>
                    {displaySentiment(symblMessage.sentiment)}
                </div>
            </div>
            )
        }
    return <div></div>;   
  });
  }

  return (
    <ScrollToBottom className={styles.container}> 
        <h3 className={styles.heading}>{TITLE}</h3>
        {getCallSentiments()}
    </ScrollToBottom>

  )
};

export { CallSentiments };