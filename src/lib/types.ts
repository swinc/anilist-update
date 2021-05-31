export interface AppState {
  searchBoxText: string,
  userData: UserData,
  contentTitle: contentTitle,
  mediaData: MediaData,
  usercontentTitle: UsercontentTitle
}

interface UserData {
  accessToken: string,
  userId: number,
  userName: string,
  userSiteUrl: string
}

interface contentTitle {
  detected: boolean,
  title: string
}

interface MediaData {

}

interface UsercontentTitle {

}

export interface BackgroundWindow extends Window {
  contentTitle?: contentTitle
}
