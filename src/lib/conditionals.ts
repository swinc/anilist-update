import { MediaData } from '../types/types'

export function notFoundError(mediaData: MediaData): boolean {
  if (Array.isArray(mediaData.errors) && mediaData.errors[0].message === "Not Found.") {
    return true
  }
  return false
}
