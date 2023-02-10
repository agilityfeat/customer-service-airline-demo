import React from 'react';
import styles from './index.module.scss';


const TITLE = 'Customer Queries';

interface Props {
  customerQuestionInsights: any[];
  isLoading?: boolean;
}

const QuestionInsights = function QuestionInsights(props: Props) {
  const {customerQuestionInsights, isLoading} = props;
  
  const getCustomerInsights = () => {
    if(isLoading) {
      return <p className={styles.text}>Fetching...</p>
    }
    if(customerQuestionInsights.length === 0) {
      return <p className={styles.text}>No Queries Available!</p>
    }
    return customerQuestionInsights.map((question: any, index) => (<p className={styles.text} key={question?.id}>{`${index+1}: ${question?.text}`}</p>));
  }

  return (
    <div className={styles.container}>
        <h3 className={styles.heading}>{TITLE}</h3>
        {getCustomerInsights()}
    </div>

  )
};

export { QuestionInsights };