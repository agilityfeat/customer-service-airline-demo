import React from 'react';
import styles from './index.module.scss';


const TITLE = 'Customer Queries';

interface Props {
  customerQuestionInsights: string[];
}

const QuestionInsights = function QuestionInsights(props: Props) {
  const {customerQuestionInsights} = props;
  
  const getCustomerInsights = () => {
    if(customerQuestionInsights.length === 0) {
      return <p className={styles.text}>No Queries Available!</p>
    }
    return customerQuestionInsights.map((question: string, index) => (<p className={styles.text} key={index+question}>{`${index+1}: ${question}`}</p>));
  }

  return (
    <div className={styles.container}>
        <h3 className={styles.heading}>{TITLE}</h3>
        {getCustomerInsights()}
    </div>

  )
};

export { QuestionInsights };