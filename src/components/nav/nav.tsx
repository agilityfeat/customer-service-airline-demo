import React from 'react';
import Link from 'next/link';
import styles from './nav.module.scss';

const Nav = function Nav() {

    return (
    <div className={styles.container}>
     <Link className={styles.link} href="/agent-access">Agent Access</Link>
    </div>

  )
};

export { Nav };