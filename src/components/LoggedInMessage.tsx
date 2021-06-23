import React from 'react'

import { User } from '../types/user-types'

interface LoggedInMessageProps {
  user: User,
  onLogout: Function
}

export function LoggedInMessage(props: LoggedInMessageProps) {
  const handleLogoutClick = () => { props.onLogout() }

  return (
    <div id="logged-in-message">
      <p id="welcome-text">
        Hello <span id="user-name" className='username'>{props.user.name}</span>!
        <a id="logout-link" href="#" onClick={handleLogoutClick}>Log out</a>
      </p>
    </div>
  )
}
