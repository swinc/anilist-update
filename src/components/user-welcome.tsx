import React from 'react'

import { AppState } from '../lib/types'
import { renderPopup } from '../popup/popup'

export class UserLoginMessage extends React.Component<AppState> {
  constructor(props: AppState) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLoginClick() {
    const loginButton: HTMLButtonElement = document.querySelector('#anilist-login-button')
    loginButton.innerHTML = 'Opening login window...'
    chrome.runtime.sendMessage('do-login')
  }

  handleLogoutClick() {
    chrome.identity.clearAllCachedAuthTokens(() => {})
    chrome.storage.sync.clear(async () => await renderPopup())
  }

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
          <p><button id="anilist-login-button" onClick={this.handleLoginClick}>Login to Anilist.co</button></p>
        </div>
      )
    }
  }
}
