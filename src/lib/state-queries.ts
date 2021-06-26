import { User } from '../types/user-types'
import { AnilistMedia } from '../types/anilist-media-type'


export function userLoggedIn(userData: User | null): boolean {
  if (Number.isInteger(userData?.id) && typeof userData?.name === 'string') {
    return true
  } else {
    return false
  }
}


export function mediaTitleIsDetected(mediaTitle: any): boolean {
  if (typeof mediaTitle === 'string' && mediaTitle.length > 0) {
    return true;
  } else {
    return false;
  }
}


export function mediaSearchDataIsAvailable(mediaData: AnilistMedia | null) {
  if (
    Number.isInteger(mediaData?.id) &&
    typeof mediaData?.title === 'string' &&
    mediaData?.title.length > 0
  ) {
    return true
  } else {
    return false
  }
}


export function userListIsAvailable(userList: any) {
  if (Number.isInteger(userList?.progress) && Number.isInteger(userList?.score)) {
    return true
  } else {
    return false
  }
}
