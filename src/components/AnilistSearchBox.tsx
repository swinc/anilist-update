import React, { useState } from 'react'

interface AnilistSearchBoxProps {
  mediaTitle: string,
  onMediaSearch: Function
}

export function AnilistSearchBox(props: AnilistSearchBoxProps) {
  const [searchString, setSearchString] = useState(props.mediaTitle)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { props.onMediaSearch(e.currentTarget.value) }
  }

  return (
    <p>Search Anilist:
      <input type="text" value={searchString ?? ''}
        onChange={handleInputChange} onKeyDown={handleSearchKeyDown} />
    </p>
  )
}
