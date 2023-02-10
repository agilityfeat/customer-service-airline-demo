import { Main } from '@/components/main';
import { ChatList } from '../chatlist';
import { ActiveFlights } from '../flights';
import styles from './index.module.scss';

export const Home = function Home() {
    return (
        <Main>
        <div className={styles.section}>
          <ChatList />
          <ActiveFlights />
        </div>
        </Main>
    )
}