import Image from 'next/image';
import styles from './index.module.scss';
import { Nav } from '../nav/nav';

export const Header = function Header() {
    return (
        <div className={styles.container}>
            <Image className={styles.logo} height={58} width={184} src='/icons/logo.svg' alt='air webrtc' />
            <Nav />
        </div>
    )
}