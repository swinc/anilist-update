import React, { useState } from 'react'

import { AnilistMedia } from '../../types/anilist-media-type'
import { AnilistUserList } from '../../types/anilist-user-list-type'

import styles from './AnilistSearchResults.module.css'

interface AnilistSearchResultsProps {
  searchedMedia: AnilistMedia | null,
  userList: AnilistUserList | null
  onUserListUpdate: Function,
  onAddMediaIdToList: Function,
  showUpdateComplete: boolean,
  showSearchedMediaNotFound: boolean,
  showSearchedUserListNotFound: boolean
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

  const handleAddMediaClick = () => {
    props.onAddMediaIdToList(props.searchedMedia?.id)
  }

  if (props.showSearchedMediaNotFound) {
    return <p id="title-not-found">Title not found on Anilist.</p>
  } else if (props.showSearchedUserListNotFound) {
    const title = props.searchedMedia!.title
    return (
      <React.Fragment>
        <p id="title-not-on-user-list">{`The Anilist title "${title}" is not on your list.`}</p>
        <button onClick={handleAddMediaClick}>Add title to list</button>
      </React.Fragment>
    )
  } else if (props.searchedMedia && props.userList) {
    const title = props.searchedMedia!.title
    const imageUrl = props.searchedMedia!.coverImageUrl
    const mediaId = props.searchedMedia!.id
    const mediaUrl = 'https://anilist.co/anime/' + mediaId
    const episodes = props.searchedMedia!.episodes
    return (
      <div id="anilist-search-results">
        <p>Closest match:</p>
        <div>
          <img className={styles.anilistMatchImage} width="100" src={imageUrl} />
          <div className={styles.contentUI}>
            <div>
              <a className={styles.titleLink} href={mediaUrl}>{title}</a>
            </div>
            <div className={styles.contentUITotalEpisodes}>Total Episodes: {episodes}</div>
            <div className={styles.contentUIProgress}>
              <span>Episode Progress</span>
              <input type="number"
                     id="episode-progress"
                     name="Episode Progress"
                     min="0" max={episodes}
                     value={episodeProgress}
                     onChange={handleEpisodeProgressChange} />
            </div>
            <div>
              <span>Score</span>
              <input
                type="number"
                id="score"
                name="Score"
                min="0" max="100"
                value={userScore}
                onChange={handleUserScoreChange} />
            </div>
            <button onClick={handleUpdateClick} className={styles.updateButton}>{buttonText}</button>
            { props.showUpdateComplete ? <div>Updated!</div> : '' }
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
