import React from 'react'

import { User } from '../../types/user-types'

interface LoggedInMessageProps {
  user: User,
  onLogout: Function
}

import styles from './LoggedInMessage.module.css'

export function LoggedInMessage(props: LoggedInMessageProps) {
  const handleLogoutClick = () => { props.onLogout() }

  return (
    <div>
      <p>
        Hello <span>{props.user.name}</span>!
        <a className={styles.logoutLink} onClick={handleLogoutClick}>Log out</a>
      </p>
    </div>
  )
}
