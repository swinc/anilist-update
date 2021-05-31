import {
  showMediaTitle,
  showMediaCoverImage,
  updateTitleLink,
  showUserProgress,
  showUserScore,
  showContentDetected,
  showContentNotDetected,
  prepopSearchBox
} from './popup-ui.js'

/**
 * Content UI block depends on searchString and userData
 * - if no searchString or no userData, do not show anything
 * - if both searchString and userData, show content UI block
*/
export function renderContentUI (contentTitle, mediaData, usercontentTitle) {
  if (!contentTitle || contentTitle === '') {
    showContentNotDetected()
    return
  }
  showContentDetected(contentTitle)
  showMediaCoverImage(mediaData.data.Media.coverImage.medium)
  showMediaTitle(mediaData.data.Media.title.english)
  updateTitleLink(mediaData.data.Media.id)
  prepopSearchBox(mediaData.data.Media.title.english)
  showUserProgress(usercontentTitle.data.MediaList.progress)
  showUserScore(usercontentTitle.data.MediaList.score)
}
