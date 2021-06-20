import React from 'react'

import { UserData } from '../lib/types'

interface LoggedInMessageProps {
  userData: UserData,
  onLogout: Function
}

export function LoggedInMessage(props: LoggedInMessageProps) {
  const handleLogoutClick = () => { props.onLogout() }

  return (
    <div>
      <p>Hello <span className='username'>{props.userData.data.Viewer.name}</span>!
      <a id="logout-link" href="#" onClick={handleLogoutClick}>Log out</a></p>
    </div>
  )
}
