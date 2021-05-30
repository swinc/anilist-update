export interface AppState {
  searchBoxText: string,
  userData: UserData,
  contentData: ContentData,
  mediaData: MediaData,
  userContentData: UserContentData
}

interface UserData {
  accessToken: string,
  userId: number,
  userName: string,
  userSiteUrl: string
}

interface ContentData {
  detected: boolean,
  title: string
}

interface MediaData {

}

interface UserContentData {

}

export interface BackgroundWindow extends Window {
  contentData?: ContentData
}
