import { UserData, MediaData, MediaListData } from './types'

export function userIsLoggedIn(userData: UserData): boolean {
  if (Number.isInteger(userData?.data?.Viewer?.id) && userData?.data?.Viewer?.name !== null) {
    return true
  } else {
    return false
  }
}

export function mediaTitleIsDetected(mediaTitle: string): boolean {
  if (typeof mediaTitle === 'string' && mediaTitle.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function mediaSearchDataIsAvailable(mediaData: MediaData) {
  if (
    typeof mediaData?.data?.Media?.coverImage?.medium === 'string' &&
    mediaData?.data?.Media?.coverImage?.medium.length > 0 &&
    Number.isInteger(mediaData?.data?.Media?.id) &&
    typeof mediaData?.data?.Media?.title?.english === 'string' &&
    mediaData?.data?.Media?.title?.english.length > 0
  ) {
    return true
  } else {
    return false
  }
}

export function userMediaNotesAreAvailable(userMediaListData: MediaListData) {
  if (
    Number.isInteger(userMediaListData?.data?.MediaList?.progress) &&
    Number.isInteger(userMediaListData?.data?.MediaList?.score)
  ) {
    return true
  } else {
    return false
  }
}
