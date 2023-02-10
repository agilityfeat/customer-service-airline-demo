import React from 'react';
import Avatar from 'react-avatar';
import classNames from 'classnames';
import styles from './nav.module.scss';

const Nav = function Nav() {

    return (
    <div className={styles.container}>
     <p className={classNames(styles.navItem)}>Support</p>
     <p className={classNames(styles.navItem, styles.navItemActive)}>Flights</p>
     <p className={styles.navItem}>Time Tracker</p>
     <p className={styles.navItem}>Mariana Lopez</p>
     <Avatar className={styles.avatar} round size='40' name="Mariana Lopez"  />
    </div>

  )
};

export { Nav };