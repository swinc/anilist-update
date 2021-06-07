import React from 'react'

import { UserData } from '../lib/types'

interface UserLoginProps {
  accessToken: string,
  userData: UserData,
  onLogin: Function,
  onLogout: Function
}

interface UserLoginState {
  buttonText: string
}

export class UserLoginMessage extends React.Component<UserLoginProps, UserLoginState> {
  constructor(props: UserLoginProps) {
    super(props)

    this.state = {
      buttonText: 'Login to Anilist.co'
    }

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLoginClick() {
    this.setState((prev) => {
      return {
        ...prev,
        buttonText: 'Logging into Anilist...'
      }
    })
    this.props.onLogin()
  }

  handleLogoutClick() { this.props.onLogout() }

  render() {
    if (this.props.accessToken !== null && this.props.userData?.data?.Viewer?.name) {
      return (
        <div>
          <p>Hello <span className='username'>{this.props.userData.data.Viewer.name}</span>!
          <a id="logout-link" href="#" onClick={this.handleLogoutClick}>Log out</a></p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Your Anilist account is not connected.</p>
          <p>
            <button id="anilist-login-button"
              onClick={this.handleLoginClick}>{this.state.buttonText}
            </button>
          </p>
        </div>
      )
    }
  }
}
