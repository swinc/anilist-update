import React, { useState } from 'react'

interface AnilistSearchBoxProps {
  mediaTitle: string | null,
  onMediaSearch: Function
}

import styles from './AnilistSearchBox.module.css'

export function AnilistSearchBox(props: AnilistSearchBoxProps) {
  const [searchString, setSearchString] = useState(props.mediaTitle)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { props.onMediaSearch(e.currentTarget.value) }
  }

  return (
    <div id="anilist-search-box">
      <span id="search-text">Search Anilist:</span>
      <input className={styles.searchBox} id="search-box" type="text" value={searchString ?? ''}
        onChange={handleInputChange} onKeyDown={handleSearchKeyDown} />
    </div>
  )
}
