import React, { useState } from 'react'

import { mediaSearchDataIsAvailable, userListIsAvailable } from '../lib/state-queries'
import { AnilistMedia } from '../types/anilist-media-type'
import { AnilistUserList } from '../types/anilist-user-list-type'

interface AnilistSearchResultsProps {
  searchedMedia: AnilistMedia | null,
  userList: AnilistUserList | null
  onUserListUpdate: Function,
  showUpdateComplete: boolean
}

export function AnilistSearchResults(props: AnilistSearchResultsProps) {
  const [buttonText, setButtonText] = useState('Update')
  const [episodeProgress, setEpisodeProgress] = useState(props.userList?.progress)
  const [userScore, setUserScore] = useState(props.userList?.score)

  const handleEpisodeProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpisodeProgress(parseInt(e.target.value))
  }

  const handleUserScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserScore(parseInt(e.target.value))
  }

  const handleUpdateClick = () => {
    setButtonText('Updating...')
    props.onUserListUpdate(episodeProgress, userScore)
  }

  if (
    mediaSearchDataIsAvailable(props.searchedMedia) &&
    userListIsAvailable(props.userList)
  ) {
    const title = props.searchedMedia!.title
    const imageUrl = props.searchedMedia!.coverImageUrl
    const mediaId = props.searchedMedia!.id
    const mediaUrl = 'https://anilist.co/anime/' + mediaId
    const episodes = props.searchedMedia!.episodes
    return (
      <div id="anilist-search-results">
        <p>Closest match:</p>
        <div id="search-content">
          <img id="anilist-match-image" width="100" src={imageUrl} />
          <div id="content-ui">
            <div id="content-ui--title">
              <a id="title-link" href={mediaUrl}>{title}</a>
            </div>
            <div id="content-ui--total-episodes">Total Episodes: {episodes}</div>
            <div id="content-ui--progress">
              <span>Episode Progress</span>
              <input type="number"
                     id="episode-progress"
                     name="Episode Progress"
                     min="0" max={episodes}
                     value={episodeProgress}
                     onChange={handleEpisodeProgressChange} />
            </div>
            <div id="content-ui--score">
              <span>Score</span>
              <input
                type="number"
                id="score"
                name="Score"
                min="0" max="100"
                value={userScore}
                onChange={handleUserScoreChange} />
            </div>
            <button onClick={handleUpdateClick} id="update-button">{buttonText}</button>
            { props.showUpdateComplete ? <div id="update-message">Updated!</div> : '' }
          </div>
        </div>
      </div>
    )
  } else if (mediaSearchDataIsAvailable(props.searchedMedia) &&
             !userListIsAvailable(props.userList) ) {
    const title = props.searchedMedia!.title
    return (
      <p id="title-not-on-user-list">{`The Anilist title "${title}" is not on your list.`}</p>
    )
  // } else if(props.mediaSearchData?.errors && props.mediaSearchData.errors[0].status === 404) {
  //   return <p id="title-not-found">Title not found on Anilist.</p>
  } else { // no mediaData or no MediaListData
    return null
  }
}
