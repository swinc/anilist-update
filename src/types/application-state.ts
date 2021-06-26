import { User } from './user-types'
import { AnilistMedia } from './anilist-media-type'
import { AnilistUserList } from './anilist-user-list-type'

export interface AppState {
  appIsLoading: boolean,
  accessToken: string | null,
  searchedMedia: AnilistMedia | null,
  detectedMediaTitle: string | null,
  user: User | null,
  userList: AnilistUserList | null,
  showUpdateComplete: boolean
}

export interface ParsedAuthData {
  responseUrl: string,
  accessToken: string,
  tokenType: string,
  expiresIn: string
}
