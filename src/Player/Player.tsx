import React from 'react'
import './Stylesheets/main-player-app.scss'
import Sidebar from './Components/Sidebar'
import PlayerContainer from './Components/PlayerContainer'

export default function Player() {
  return (
    <div className="player-app-container">
      <Sidebar />
      <PlayerContainer />
    </div>
  )
}
