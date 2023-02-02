import { CallEndButton } from '@/components/buttons/call-end';
import React from 'react';
import styles from './call-room.module.scss';


interface Props {
  onDisconnect: () => void;
}
const CallRoomView = function CalCallRoomViewlRoom(props : Props) {
  const {onDisconnect} = props;
  return (
    <div className={styles.container}>
    <div className={styles.videos} id="videos">
      <div className={styles.subscriber} id="subscriber"/>
      <div className={styles.publisher} id="publisher"/>
      <div className={styles.callActions}>
        <CallEndButton onClick={onDisconnect} />
    </div>
    </div>
   
  </div>
      
  );
};

export { CallRoomView };