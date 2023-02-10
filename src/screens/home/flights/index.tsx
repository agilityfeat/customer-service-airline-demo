import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/buttons/primary';
import styles from './index.module.scss';

const DummyChatList = [
    {
    id:1,
    duration: '16h 56min',
    time: '7:00AM - 8:00AM',
    flightName: 'Hawaian Airline',
    stops: '1',
    stopsDuration: '0h 45m in HNL'
    },
    {
        id:2,
        duration: '18h 6min',
        time: '10:00PM - 11:30PM',
        flightName: 'Hawaian Airline',
        stops: '3',
        stopsDuration: '20h 45m in MNK'
        },
        {
            id:3,
            duration: '8h 56min',
            time: '1:00AM - 6:00AM',
            flightName: 'Delta',
            stops: '8',
            stopsDuration: '1h 3m in ICN'
            },
            {
                id:4,
                duration: '5h 00min',
                time: '1:00PM - 5:00PM',
                flightName: 'Hawaian Airline',
                nonStop: true,
                },
                {
                    id:5,
                    duration: '16h 56min',
                    time: '7:00AM - 8:00AM',
                    flightName: 'Delta',
                    nonStop: true
                    },
]

export const ActiveFlights = function ChatList() {
    return (
        <div className={styles.container}>
          <h2 className={styles.heading}>Active Flights</h2>
          <div className={styles.flightContainer}>
            {DummyChatList.map((item) => (
                    <div key={item.id} className={styles.listItem}>
                      <div className={styles.item}>
                        <p>{item.duration}</p>
                        <p className={styles.secondaryText}>{item.flightName}</p>
                      </div>
                      <div className={styles.item}>
                      <p>{item.time}</p>
                      </div>
                      <div className={styles.item}>
                        {item.nonStop ?
                        <p>Nonstop</p>
                        :
                        <>
                              <p>{item.stops} stop</p>
                        <p className={styles.secondaryText}>Hawaian Airlines</p>
                        </>
}
                
                      </div>
                    </div>
                ))}
          </div>
        </div>
    )
}