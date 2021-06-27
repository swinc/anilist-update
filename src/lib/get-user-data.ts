import _ from 'lodash'

import { fetchUserData } from './query-anilist'

import { User } from '../types/user-types'

type StoredUserData = {
  userName: string,
  userId: number,
  userSiteUrl: string
}

export async function getStoredUserData(): Promise<StoredUserData> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['userName', 'userId', 'userSiteUrl'],
      function(response) {
        if (!response) {
          reject(new Error('getStoredUserData() returned unexpected value.'))
        } else {
          resolve(response as StoredUserData)
        }
    })
  })
}


// first attempts to retrive from local cache; if not present, will go to network and save
export async function getUserData(accessToken: string): Promise<User> {
  debugger
  const storedUserData = await getStoredUserData()
  if (!_.isEmpty(storedUserData)) {
    return {
      name: storedUserData.userName,
      id: storedUserData.userId,
      siteUrl: storedUserData.userSiteUrl
    }
  } else {
    const networkUserData = await fetchUserData(accessToken)
    chrome.storage.sync.set({
      userName: networkUserData.name,
      userId: networkUserData.id,
      userSiteUrl: networkUserData.siteUrl
    })
    return networkUserData
  }


}
