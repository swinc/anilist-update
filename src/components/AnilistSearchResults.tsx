import React, { useState } from 'react'

import { mediaSearchDataIsAvailable, userMediaNotesAreAvailable } from '../lib/state-queries'
import { MediaData, MediaListData } from '../lib/types'

interface AnilistSearchResultsProps {
  mediaSearchData: MediaData,
  userMediaListData: MediaListData
  onUserNotesUpdate: Function,
  showUpdateComplete: boolean
}

export function AnilistSearchResults(props: AnilistSearchResultsProps) {
  const [buttonText, setButtonText] = useState('Update')
  const [episodeProgress, setEpisodeProgress] = useState(props.userMediaListData?.data?.MediaList?.progress)
  const [userScore, setUserScore] = useState(props.userMediaListData?.data?.MediaList?.score)

  const handleEpisodeProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpisodeProgress(parseInt(e.target.value))
  }

  const handleUserScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserScore(parseInt(e.target.value))
  }

  const handleUpdateClick = () => {
    setButtonText('Updating...')
    props.onUserNotesUpdate(episodeProgress, userScore)
  }

  if (
    mediaSearchDataIsAvailable(props.mediaSearchData) &&
    userMediaNotesAreAvailable(props.userMediaListData)
  ) {
    const title = props.mediaSearchData.data.Media.title.english
    const imageUrl = props.mediaSearchData.data.Media.coverImage.medium
    const mediaId = props.mediaSearchData.data.Media.id
    const mediaUrl = 'https://anilist.co/anime/' + mediaId
    const episodes = props.mediaSearchData.data.Media.episodes
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
                     value={episodeProgress}
                     onChange={handleEpisodeProgressChange} />
            </div>
            <div id="content-ui--score">
              Score
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
  } else if (!userMediaNotesAreAvailable(props.userMediaListData)) {
    return (
      <p>This title is not on your list.</p>
    )
  } else { // no mediaData or no MediaListData
    return (<p></p>)
  }
}
