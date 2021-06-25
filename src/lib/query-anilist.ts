import axios, { AxiosRequestConfig } from 'axios'

import { MediaData, MediaListData, SaveMediaListEntry } from '../types/types'
import { AnilistUserResponse, User } from '../types/user-types'
import { CustomError } from './anilist-update-errors'

/**
 * generic query function for Anilist API
 * throws CustomError if unable to complete
 */
export async function queryAnilist(
  query: string,
  variables: {},
  accessToken: string | null
): Promise<{}> {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: 'https://graphql.anilist.co',
    data: {
      query: query,
      variables: variables
    }
  }
  if (typeof accessToken === 'string') { // add to request
    Object.assign(requestConfig, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  }

  const response = await axios(requestConfig)

  if(Array.isArray(response.data.errors)) { // something went wrong
    throw new CustomError({
      message: `Error querying Anilist API: ${response.data.errors[0].message}`,
      data: response.data.errors
    })
  }

  return response.data
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

export async function fetchUserData(accessToken: string): Promise<User> {
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
