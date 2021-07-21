import { MediaData, UserData, MediaListData } from './types'

interface AnilistRequestInit extends RequestInit {
  headers: {
    'Content-Type': string,
    Accept: string,
    Authorization?: string
  }
}

// generic query function
export function queryAnilist(query: string, variables: {}, accessToken: string): Promise<{}> {
  return new Promise((resolve, reject) => {
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
        console.error(error)
        reject(error)
      })

    function extractJson(response: Response): Promise<{}> {
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
      .then((result: MediaData) => resolve(result))
      .catch((error) => reject(error))
  })
}

export function queryUserMediaNotes(mediaId: number, userName: string): Promise<MediaListData> {
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
      .then((response: MediaListData) => resolve(response))
      .catch((errorResponse: MediaListData) => {
        if (errorResponse.data.MediaList === null) {
          resolve(null)
        } else {
          reject(errorResponse)
        }
      })
  })
}

export function updateUserMediaNotes(
  mediaId: number,
  progress: number,
  score: number,
  accessToken: string
) {
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
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  })
}

export function addMediaIdToList(mediaId: number, accessToken: string) {
  return new Promise((resolve, reject) => {
    if (isNaN(mediaId) || !accessToken) {
      reject(new Error(`ERROR: invalid value for mediaId (${mediaId}), or accessToken (${accessToken})`))
      return
    }
    const query = `
      mutation ($mediaId: Int) {
          SaveMediaListEntry (mediaId: $mediaId) {
              id
              mediaId
              status
          }
      }
    `
    const variables = { mediaId: mediaId}
    queryAnilist(query, variables, accessToken)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  })
}

export function queryUserData(accessToken: string): Promise<UserData> {
  return new Promise((resolve, reject) => {
    const query = `
      query {
        Viewer {
          id
          name
          siteUrl
        }
      }
    `
    queryAnilist(query, null, accessToken)
      .then((response: UserData) => { resolve(response) })
      .catch((error) => reject(error))
  })
}
