import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/buttons/primary';
import styles from './index.module.scss';

const DummyChatList = [
    {
    id:1,
    time: '7:35 am',
    flightCode: 'AEB2345',
    customerName: 'Alberto Gonzalez',
    },
    {
        id:2,
        time: '7:35 am',
        flightCode: 'AEB2345',
        customerName: 'Alberto Gonzalez',
    },
    {
        id:3,
            time: '7:35 am',
            flightCode: 'AEB2345',
            customerName: 'Alberto Gonzalez',
    },
    {
        id:4,
    time: '7:35 am',
    flightCode: 'AEB2345',
    customerName: 'Alberto Gonzalez',
    },
    {
        id:5,
    time: '7:35 am',
    flightCode: 'AEB2345',
    customerName: 'Alberto Gonzalez',
    },  
]

export const ChatList = function ChatList() {
    const router = useRouter();

    const onStartChat = () => {
        router.push('/agent-access');
    }
    return (
        <div className={styles.container}>
          <h2 className={styles.heading}>Chats</h2>
          <div className={styles.chatContainer}>
            {DummyChatList.map((item) => (
                    <div key={item.id} className={styles.listItem}>
                    <div className={styles.infoSection}>
                      <div className={styles.infoSectionItem}>
                        <p>Start {item.time}</p>
                        <p className={styles.flightText}>{item.flightCode}</p>
                      </div>
                      <p>{item.customerName}</p>
                    </div>
                    <PrimaryButton onClick={onStartChat}>Start Chat</PrimaryButton>
                    </div>
                ))}
          </div>
        </div>
    )
}