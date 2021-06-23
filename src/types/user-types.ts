export type User = {
  id: number,
  name: string,
  siteUrl: string
}

export type AnilistUserResponse = {
  data: {
    Viewer: User
  }
}
