import { useState, useRef, MutableRefObject } from 'react'
import './Stylesheets/main-player-app.scss'
import LivePlayerContainer from './Components/LivePlayerContainer'
import VodSeriesPlayer from './Components/VodSeriesPlayer'
import { controleHandler, handleWheelControls } from './tools/controlHandlers'

export default function Player() {

  // refs
  const IsLive = true
  const livePlayerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  // hooks
  const [showControls, setShowControls] = useState(false as boolean)
  const [isPlaying, setIsPlaying] = useState(true as boolean)
  const [isFullScreen, setIsFullScreen] = useState(false as boolean)
  const [isMuted, setIsMuted] = useState(true as boolean)
  const [volumeValue, setVolumeValue] = useState(0 as number)
  const [showVolumeNotification, setShowVolumeNotification] = useState(false as boolean)

  // interractions & GUI control
  const untoggleControls = setTimeout(() => {
    setShowControls(false)
  }, 4000)
  const toggleControls = () => {
    setShowControls(true)
    clearTimeout(untoggleControls)
  }

  const untoggleVolumePopup = setTimeout(() => {
    setShowVolumeNotification(false)
  }, 3000)
  const showVolumePopup = () => {
    setShowVolumeNotification(true)
    clearTimeout(untoggleVolumePopup)
  }

  const handleKeyActions = (e: string) => {
    switch (e) {
      case ' ':
        controleHandler({ action: 'play', playerRef: livePlayerRef, isPlaying, setIsPlaying })
        break;
      case 'f':
        controleHandler({ action: 'fullscreen', playerRef: livePlayerRef, isFullScreen, setIsFullScreen })
        break;
      case 'm':
        controleHandler({ action: 'mute', playerRef: livePlayerRef, isMuted, setIsMuted })
        break;
      case 'ArrowUp':
        handleWheelControls({ wheelValue: -10, playerRef: livePlayerRef, setVolumeValue, setIsMuted, isMuted })
        showVolumePopup()
        break;
      case 'ArrowDown':
        handleWheelControls({ wheelValue: +10, playerRef: livePlayerRef, setVolumeValue, setIsMuted, isMuted })
        showVolumePopup()
    }
  }


  return (
    <div className="player-app-container"
      tabIndex={0}
      onMouseMove={() => toggleControls()}
      onDoubleClick={() => controleHandler({ action: 'fullscreen', playerRef: livePlayerRef, isFullScreen, setIsFullScreen })}
      onKeyDown={(e) => handleKeyActions(e.key)}
      onWheel={(e) => { handleWheelControls({ wheelValue: e.deltaY, playerRef: livePlayerRef, setVolumeValue, setIsMuted, isMuted }); showVolumePopup()}}
    >
      {
        IsLive
          ? <LivePlayerContainer
            showControls={showControls}
            livePlayerRef={livePlayerRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isMuted={isMuted}
            volumeValue={volumeValue}
            showVolumeNotification={showVolumeNotification}
          />
          : <VodSeriesPlayer />
      }
    </div>
  )
}
