import { User } from './user-types'

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

export interface AnilistAPIError {
  locations: [],
  message: string,
  status: number
}

export interface ParsedAuthData {
  responseUrl: string,
  accessToken: string,
  tokenType: string,
  expiresIn: string
}
