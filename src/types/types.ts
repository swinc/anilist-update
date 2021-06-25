import { User } from './user-types'
import { AnilistAPIError } from './anilist-api-responses'

export interface AppState {
  appIsLoading: boolean,
  accessToken: string | null,
  mediaSearchData: MediaData | null,
  mediaTitle: string | null,
  user: User | null,
  userMediaListData: MediaListData | null,
  showUpdateComplete: boolean
}

export interface MediaData {
  data: {
    Media: null | MediaDataFields
  },
  errors?: AnilistAPIError[]
}

type MediaDataFields = {
  coverImage: {
    medium: string
  },
  episodes: number,
  id: number,
  title: {
    english: string
  }
}

export interface MediaListData {
  data: {
    MediaList: null | MediaListDataFields
  }
}

type MediaListDataFields = {
  progress: number,
  score: number
}

export interface SaveMediaListEntry {
  data: {
    SaveMediaListEntry: {
      id: number,
      progress: number,
      score: number
    }
  }
}

export interface ParsedAuthData {
  responseUrl: string,
  accessToken: string,
  tokenType: string,
  expiresIn: string
}

export interface AnilistRequestInit extends RequestInit {
  headers: {
    'Content-Type': string,
    Accept: string,
    Authorization?: string
  }
}
