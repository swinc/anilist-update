import { getStoredAccessToken } from '../lib/get-stored-access-token'
import { getMediaTitle } from '../lib/get-media-title'
import { fetchUserData, fetchAnilistMedia, fetchAnilistUserList } from '../lib/query-anilist'

import { AnilistMedia } from '../types/anilist-media-type'
import { User } from '../types/user-types'
import { AnilistUserList } from '../types/anilist-user-list-type'

export async function getInitialState() {
  let accessToken: null | string = null
  let mediaTitle: null | string = null
  let mediaData: null | AnilistMedia = null
  let userData: null | User = null
  let userList: null | AnilistUserList = null
  let showSearchedMediaNotFound: boolean = false
  let showSearchedUserListNotFound: boolean = false

  accessToken = await getStoredAccessToken()
  if (accessToken) { userData = await fetchUserData(accessToken) }
  mediaTitle = await getMediaTitle()

  if (mediaTitle && userData) {
    try { mediaData = await fetchAnilistMedia(mediaTitle) }
    catch (error) {
      if (error.is404()) {
        showSearchedMediaNotFound = true
      }
    }
  }

  if (mediaData && userData) {
    try { userList = await fetchAnilistUserList(mediaData.id, userData.name) }
    catch (error) {
      if (error.is404()) {
        showSearchedUserListNotFound = true
      }
    }
  }

  return {
    accessToken: accessToken,
    detectedMediaTitle: mediaTitle,
    searchedMedia: mediaData,
    showSearchedMediaNotFound: showSearchedMediaNotFound,
    showSearchedUserListNotFound: showSearchedUserListNotFound,
    user: userData,
    userList: userList
  }
}
