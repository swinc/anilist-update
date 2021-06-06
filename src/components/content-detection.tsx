import React from 'react'

// import { querySearchMedia, queryUserMediaNotes } from '../lib/query-anilist'
import { AppState } from '../lib/types'

interface ContentDetectionState {
  searchString: string
}

export class ContentDetection extends React.Component<AppState, ContentDetectionState> {
  constructor(props: AppState) {
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
      alert('searching!')
      // const mediaSearchData = await querySearchMedia(e.currentTarget.value)
      // const mediaListData = await queryUserMediaNotes(
      //   mediaSearchData.data.Media.id,
      //   this.props.userData.data.Viewer.name
      // )
    }
  }

  render() {
    if (!this.props.userData?.data?.Viewer?.name) { // no user data
      return (<p></p>)
    } else if (!this.props.mediaTitle) { // user data but no content data
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
