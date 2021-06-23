import { MediaData, UserData, MediaListData, SaveMediaListEntry } from './types'

interface AnilistRequestInit extends RequestInit {
  headers: {
    'Content-Type': string,
    Accept: string,
    Authorization?: string
  }
}

// generic query function
export function queryAnilist(query: string, variables: {}, accessToken: string | null): Promise<{}> {
  return new Promise((resolve) => {
    const url = 'https://graphql.anilist.co'
    const options: AnilistRequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }

    if (accessToken) { // add to request
      options.headers.Authorization = 'Bearer ' + accessToken
    }

    // make the API request
    fetch(url, options)
      .then(extractJson)
      .then((json: {}) => resolve(json))
      .catch((error) => {
        resolve(error)
      })

    async function extractJson(response: Response): Promise<{}> {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json)
      })
    }
  })
}

export function querySearchMedia(searchString: string): Promise<MediaData> {
  return new Promise((resolve, reject) => {
    if (!searchString || searchString === '') {
      reject(new Error('invalid value for searchString'))
      return
    }
    const query = `
      query ($search: String) {
        Media (search: $search, type: ANIME) {
          id
          title {
            english
          }
          episodes
          coverImage {
            medium
          }
        }
      }
    `
    const variables = { search: searchString }
    queryAnilist(query, variables, null)
      .then((result) => { resolve(result as MediaData) })
  })
}

export function queryUserMediaNotes(mediaId: number, userName: string): Promise<MediaListData | null> {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(mediaId) || !userName) {
      reject(new Error('invalid values for mediaId or userName'))
      return
    }
    const query = `
      query ($mediaId: Int, $userName: String) {
        MediaList (mediaId: $mediaId, userName: $userName) {
          status
          progress
          score
        }
      }
    `
    const variables = { mediaId: mediaId, userName: userName }
    queryAnilist(query, variables, null)
      .then((response) => resolve(response as MediaListData))
  })
}

export function updateUserMediaNotes(
  mediaId: number,
  progress: number,
  score: number,
  accessToken: string
): Promise<SaveMediaListEntry> {
  return new Promise((resolve, reject) => {
    if (isNaN(mediaId) || isNaN(progress) || isNaN(score) || !accessToken) {
      reject(new Error(`ERROR: invalid value for mediaId (${mediaId}), progress (${progress}),
              score (${score}), or accessToken (${accessToken})`))
      return
    }
    const query = `
      mutation ($mediaId: Int, $progress: Int, $scoreRaw: Int) {
          SaveMediaListEntry (mediaId: $mediaId, progress: $progress, scoreRaw: $scoreRaw) {
              id
              progress
              score
          }
      }
    `
    const variables = { mediaId: mediaId, progress: progress, scoreRaw: score }
    queryAnilist(query, variables, accessToken)
      .then((result) => resolve(result as SaveMediaListEntry))
  })
}

export function queryUserData(accessToken: string): Promise<UserData> {
  return new Promise((resolve) => {
    const query = `
      query {
        Viewer {
          id
          name
          siteUrl
        }
      }
    `
    queryAnilist(query, {}, accessToken)
      .then((response) => { resolve(response as UserData) })
  })
}
