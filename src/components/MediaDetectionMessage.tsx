import React from 'react'

import { mediaTitleIsDetected } from '../lib/state-queries'

interface MediaDetectionMessageProps {
  mediaTitle: string | null,
}

export function MediaDetectionMessage(props: MediaDetectionMessageProps) {
  if (mediaTitleIsDetected(props.mediaTitle)) {
    return <p id="content-detected-text">You're watching {props.mediaTitle}.</p>
  } else {
    return <p id="no-content-detected-text">No content detected.</p>
  }
}
