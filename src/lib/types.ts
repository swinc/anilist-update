export interface AppState {
  accessToken: string,
  mediaSearchData: MediaData,
  mediaTitle: string,
  searchBoxText: string,
  userData: UserData,
  userMediaListData: MediaListData
}

export interface UserData {
  data: {
    Viewer: {
      id: number,
      name: string,
      siteUrl: string
    }
  }
}

export interface MediaData {
  data: {
    Media: {
      coverImage: {
        medium: string
      },
      episodes: number,
      id: number,
      title: {
        english: string
      }
    }
  },
  errors?: []
}

export interface MediaListData {
  data: {
    MediaList: {
      progress: number,
      score: number,
      status: string
    }
  }
}

export interface ParsedAuthData {
  responseUrl: string,
  accessToken: string,
  tokenType: string,
  expiresIn: string
}
