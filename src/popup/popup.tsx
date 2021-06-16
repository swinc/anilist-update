import React from 'react'
import ReactDOM from 'react-dom'

import { Popup } from '../components/Popup'

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Popup />,
    document.getElementById('popup-app')
  )
})
