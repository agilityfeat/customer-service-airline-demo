import React from 'react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/buttons/primary';
import { Nav } from '../nav/nav';
import styles from './home.module.scss';


const TITLE = 'AirWebRTC Customer Care Center'

const Home = function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push('/customer-chat');
  }
  return (
    <div className={styles.main}>
        <Nav />
    <div className={styles.container}>
        <h1 className={styles.heading}>{TITLE}</h1>
        <section className={styles.section}>
            <PrimaryButton onClick={onClick}>Start Chat</PrimaryButton>
        </section>
    </div>
    </div>

  )
};

export { Home };