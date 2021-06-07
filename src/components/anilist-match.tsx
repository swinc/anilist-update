import React from 'react'

import { MediaData, MediaListData } from '../lib/types'

interface AnilistMatchProps {
  mediaSearchData: MediaData,
  userMediaListData: MediaListData
  onUserNotesUpdate: Function,
  showUpdateComplete: boolean
}

interface AnilistMatchState {
  updateButtonText: string,
  episodeProgress: string | number,
  userScore: string | number
}

export class AnilistMatch extends React.Component<AnilistMatchProps, AnilistMatchState> {
  constructor(props: AnilistMatchProps) {
    super(props)

    this.state = {
      updateButtonText: 'Update',
      episodeProgress: this.props.userMediaListData.data.MediaList.progress,
      userScore: this.props.userMediaListData.data.MediaList.score
    }

    this.handleEpisodeProgressChange = this.handleEpisodeProgressChange.bind(this)
    this.handleUserScoreChange = this.handleUserScoreChange.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
  }

  handleEpisodeProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e)
    this.setState((prev) => {
      return {
        ...prev,
        episodeProgress: e.target.value
      }
    })
  }

  handleUserScoreChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prev) => {
      return {
        ...prev,
        userScore: e.target.value
      }
    })
  }

  handleUpdateClick() {
    this.setState(
      (prev) => { return { ...prev, updateButtonText: 'Updating...' }},
      () => { this.props.onUserNotesUpdate(this.state.episodeProgress, this.state.userScore) }
    )
  }

  render() {
    if (this.props.mediaSearchData && this.props.userMediaListData?.data.MediaList) {
      const title = this.props.mediaSearchData.data.Media.title.english
      const imageUrl = this.props.mediaSearchData.data.Media.coverImage.medium
      const mediaId = this.props.mediaSearchData.data.Media.id
      const mediaUrl = 'https://anilist.co/anime/' + mediaId
      const episodes = this.props.mediaSearchData.data.Media.episodes
      return (
        <div>
          <p>Closest match:</p>
          <div id="content-block">
            <img id="anilist-match--image" width="100" src={imageUrl} />
            <div id="content-ui">
              <div id="content-ui--title">
              <a id="title-link" href={mediaUrl}>{title}</a></div>
              <div id="content-ui--total-episodes">Total Episodes: {episodes}</div>
              <div id="content-ui--progress">
                Episode Progress
                <input type="number"
                       id="episode-progress"
                       name="Episode Progress"
                       min="0" max={episodes}
                       value={this.state.episodeProgress}
                       onChange={this.handleEpisodeProgressChange} />
              </div>
              <div id="content-ui--score">
                Score
                <input
                  type="number"
                  id="score"
                  name="Score"
                  min="0" max="100"
                  value={this.state.userScore}
                  onChange={this.handleUserScoreChange} />
              </div>
              <button onClick={this.handleUpdateClick} id="update-button">{this.state.updateButtonText}</button>
              { this.props.showUpdateComplete ? <div id="update-message">Updated!</div> : '' }
            </div>
          </div>
        </div>
      )
    } else if (this.props.userMediaListData?.data?.MediaList === null) {
      return (
        <p>This title is not on your list.</p>
      )
    } else { // no mediaData or no MediaListData
      return (<p></p>)
    }
  }
}
