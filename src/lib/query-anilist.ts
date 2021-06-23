import { MediaData, MediaListData, SaveMediaListEntry } from '../types/types'
import { AnilistUserResponse, User } from '../types/user-types'
import { notFoundError } from './conditionals'

interface AnilistRequestInit extends RequestInit {
  headers: {
    'Content-Type': string,
    Accept: string,
    Authorization?: string
  }
}

// generic query function
export function queryAnilist(query: string, variables: {}, accessToken: string | null): Promise<{}> {
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
      .catch((errorResponse) => {
        debugger
        if (notFoundError(errorResponse)) {
          return resolve(errorResponse as MediaData)
        }
        console.error(errorResponse)
        reject(errorResponse)
      })

    async function extractJson(response: Response): Promise<{}> {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json)
      })
    }
  })
}

export async function querySearchMedia(searchString: string): Promise<MediaData> {
  const emptyMediaData = { data: { Media: null } }
  if (!searchString || searchString === '') {
    console.error('invalid value for searchString')
    return emptyMediaData
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
  const result = await queryAnilist(query, variables, null) as MediaData

  if (result.data.Media?.title.english === null) {
    return emptyMediaData
  }
  return result
}

export async function queryUserMediaNotes(mediaId: any, userName: any): Promise<MediaListData> {
  if (!Number.isInteger(mediaId) || typeof userName !== 'string') {
    console.error('Invalid values for mediaId or userName')
    return { data: { MediaList: null } }
  }
  const query = `
    query ($mediaId: Int, $userName: String) {
      MediaList (mediaId: $mediaId, userName: $userName) {
        progress
        score
      }
    }
  `
  const variables = { mediaId: mediaId, userName: userName }
  const result = await queryAnilist(query, variables, null)
  return result as MediaListData
}

export async function updateUserMediaNotes(
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

export async function queryUserData(accessToken: string): Promise<User> {
  const query = `
    query {
      Viewer {
        id
        name
        siteUrl
      }
    }
  `
  const result = await queryAnilist(query, {}, accessToken) as AnilistUserResponse
  return {
    id: result.data.Viewer.id,
    name: result.data.Viewer.name,
    siteUrl: result.data.Viewer.siteUrl
  }
}
