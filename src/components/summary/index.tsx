import React from 'react';
import styles from './index.module.scss';


const TITLE = 'Call Summary';

interface Props {
  data: any;
  isLoading?: boolean;
}

const Summary = function Summary(props: Props) {
  const {data, isLoading} = props;
  
  const getSummary = () => {
    if(isLoading) {
      return <p className={styles.text}>Fetching...</p>
    }
    if(data.length === 0) {
      return <p className={styles.text}>No Summary Available!</p>
    }
    return <p className={styles.text}>{data?.summary[0]?.text}</p>;
  }

  return (
    <div className={styles.container}>
        <h3 className={styles.heading}>{TITLE}</h3>
        {getSummary()}
    </div>

  )
};

export { Summary };