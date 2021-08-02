import React from 'react'

import { mediaTitleIsDetected } from '../../lib/state-queries'

interface MediaDetectionMessageProps {
  mediaTitle: string | null,
}

export function MediaDetectionMessage(props: MediaDetectionMessageProps) {
  if (mediaTitleIsDetected(props.mediaTitle)) {
    return <p>You're watching {props.mediaTitle}.</p>
  } else {
    return <p>No content detected.</p>
  }
}
