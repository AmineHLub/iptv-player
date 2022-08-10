import { useState } from 'react'
import './Stylesheets/main-player-app.scss'
import Sidebar from './Components/Sidebar'
import LivePlayerContainer from './Components/LivePlayerContainer'
import VodSeriesPlayer from './Components/VodSeriesPlayer'

export default function Player() {
  const IsLive = true
  const [showControls, setShowControls] = useState(false as boolean)
  const [isPlaying, setIsPlaying] = useState(true as boolean)
  const [isFullScreen, setIsFullScreen] = useState(false as boolean)

  const clearingTimeout = setTimeout(() => {
    setShowControls(false)
  }, 3000)
  const toggleControls = () => {
    setShowControls(true)
    clearTimeout(clearingTimeout)
  }
  return (
    <div className="player-app-container"
      onMouseMove={() => toggleControls()}
    >
      {
        IsLive
          ? <LivePlayerContainer
          showControls={showControls} />
          : <VodSeriesPlayer />
      }
    </div>
  )
}
