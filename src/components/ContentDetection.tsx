import React from 'react'

import { userIsLoggedIn, mediaTitleIsDetected } from '../lib/state-queries'
import { UserData } from '../lib/types'

interface ContentDetectionProps {
  mediaTitle: string,
  userData: UserData,
  onMediaSearch: Function
}

interface ContentDetectionState {
  searchString: string
}

export class ContentDetection extends React.Component<ContentDetectionProps, ContentDetectionState> {
  constructor(props: ContentDetectionProps) {
    super(props)
    this.state = { searchString: this.props.mediaTitle }

    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState(() => {
      return { searchString: e.target.value }
    })
  }

  handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.props.onMediaSearch(e.currentTarget.value)
    }
  }

  render() {
    if (!userIsLoggedIn(this.props.userData)) {
      return (<p></p>)
    } else if (!mediaTitleIsDetected(this.props.mediaTitle)) {
      return (
        <div>
          <p>No content detected.</p>
          <p>Search Anilist:
            <input type="text" value={this.state.searchString}
              onChange={this.handleInputChange} onKeyDown={this.handleSearchKeyDown} />
          </p>
        </div>
      )
    } else { // we have user data and content data
      return (
        <div>
          <p>You're watching {this.props.mediaTitle}.</p>
          <p>Search Anilist:
            <input type="text" value={this.state.searchString}
              onChange={this.handleInputChange} onKeyDown={this.handleSearchKeyDown} />
          </p>
        </div>
      )
    }
  }
}
