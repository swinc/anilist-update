import React, { useState } from 'react'

interface LoggedOutMessageProps {
  onLogin: Function,
}

export function LoggedOutMessage(props: LoggedOutMessageProps) {
  const [buttonText, setButtonText] = useState('Login to Anilist.co')

  const handleLoginClick = () => {
    setButtonText('Logging into Anilist...')
    props.onLogin()
  }

  return (
    <div id="logged-out-message">
      <p id="account-not-connected-text">Your Anilist account is not connected.</p>
      <button id="anilist-login-button"
        onClick={handleLoginClick}>{buttonText}
      </button>
    </div>
  )
}
