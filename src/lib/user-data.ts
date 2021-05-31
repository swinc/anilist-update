export interface UserData {
  accessToken: string,
  userId: number,
  userName: string,
  userSiteUrl: string
}

export function getUserData (): Promise<UserData> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['accessToken', 'userId', 'userName', 'userSiteUrl'],
      function (userData: UserData) {
        if (!userData) {
          reject(new Error('getUserData() returned null.'))
        } else {
          resolve({
            accessToken: userData.accessToken,
            userId: userData.userId,
            userName: userData.userName,
            userSiteUrl: userData.userSiteUrl
          })
        }
      })
  })
}
