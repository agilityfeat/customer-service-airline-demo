/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Image from 'next/image';
import styles from './button.module.scss';


interface Props {
    onClick:() => void;
}

export const CallEndButton = function Button({...props}: Props) {
  return  <div className={styles.callend} {...props}><Image  height={40} width={40} alt='call-end-btn' src='/icons/call-end.svg'/></div>
}
