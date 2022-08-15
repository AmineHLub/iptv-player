import { useRef, MutableRefObject, useState, useMemo } from 'react'
import '../Stylesheets/main-player-app.scss'
import ReactPlayer from 'react-player'
import { xtreamData, livextreamPlaylist } from '../PlayerPropTypes';
import PlayerControls from './RegularPlayerComponents/PlayerControls';
import { handleWheelControls, controleHandler } from '../tools/controlHandlers'

type Props = {
  type: string
  data: {
    xtreamData: xtreamData,
    currentStream: livextreamPlaylist | undefined,
  },
  partOfApp?: Function | undefined,
  setCurrentStream: Function,
  playlist?: livextreamPlaylist[],
}


export default function VodSeriesPlayer({ data, type, partOfApp, setCurrentStream, playlist }: Props) {
  const regularPlayerRef = useRef() as MutableRefObject<ReactPlayer>;
  const [showControls, setShowControls] = useState(false as boolean)
  const [isPlaying, setIsPlaying] = useState(true as boolean)
  const [isFullScreen, setIsFullScreen] = useState(false as boolean)
  const [isMuted, setIsMuted] = useState(true as boolean)
  const [mousePos, setMousePos] = useState(null as null | number)
  const [volumeValue, setVolumeValue] = useState(0 as number)
  const [showVolumeNotification, setShowVolumeNotification] = useState(false as boolean)
  const [currentProgress, setCurrentProgress] = useState({
    currentProgress: 0,
    buffered: 0,
  } as { currentProgress: number, buffered: number })


  const toggleControls = (e: any) => {
    setShowControls(true)
    setMousePos(e.clientX)
    setTimeout(() => {
      if (e.clientX === mousePos) {
        setShowControls(false)
      }
    }, 4000)
  }

  var untoggleVolumePopup = setTimeout(() => {
    setShowVolumeNotification(false)
  }, 3000)
  const showVolumePopup = () => {
    setShowVolumeNotification(true)
    clearTimeout(untoggleVolumePopup)
  }


  const handleKeyActions = (key: string) => {
    switch (key) {
      case ' ':
        controleHandler({ action: 'play', playerRef: regularPlayerRef.current.getInternalPlayer(), isPlaying, setIsPlaying })
        break;
      case 'f':
        controleHandler({ action: 'fullscreen', playerRef: regularPlayerRef.current.getInternalPlayer(), isFullScreen, setIsFullScreen })
        break;
      case 'm':
        controleHandler({ action: 'mute', playerRef: regularPlayerRef.current.getInternalPlayer(), isMuted, setIsMuted })
        break;
      case 'ArrowUp':
        handleWheelControls({ wheelValue: -10, playerRef: regularPlayerRef.current.getInternalPlayer(), setVolumeValue, setIsMuted, isMuted })
        showVolumePopup()
        break;
      case 'ArrowDown':
        handleWheelControls({ wheelValue: +10, playerRef: regularPlayerRef.current.getInternalPlayer(), setVolumeValue, setIsMuted, isMuted })
        showVolumePopup()
        break;
      case 'ArrowLeft':
        regularPlayerRef.current.seekTo(currentProgress.currentProgress - 5)
        break;
      case 'ArrowRight':
        regularPlayerRef.current.seekTo(currentProgress.currentProgress + 5)
        break;
    }
  }


  const handleProgressBar = () => {
    if (regularPlayerRef.current) {
      setCurrentProgress({
        currentProgress: regularPlayerRef.current.getCurrentTime(),
        buffered: regularPlayerRef.current.getSecondsLoaded()
      })
    }
    setTimeout(handleProgressBar, 500)
  }

  const builtUrl = () => {
    if (type === 'vod') {
      return `http://${data.xtreamData.url}/movie/${data.xtreamData.user_info.username}/${data.xtreamData.user_info.password}/${data.currentStream?.stream_id}.${data.currentStream?.container_extension}`
    }
    if (type === 'serie') {
      return `http://${data.xtreamData.url}/series/${data.xtreamData.user_info.username}/${data.xtreamData.user_info.password}/${data.currentStream?.id}.${data.currentStream?.container_extension}`
    }
  }

  return (
    <div className="player-app-container"
      onMouseMove={(e) => toggleControls(e)}
      onClick={() => handleKeyActions(' ')}
      onDoubleClick={() => handleKeyActions('f')}
      onKeyDown={(e) => handleKeyActions(e.key)}
      onWheel={(e) => { handleWheelControls({ wheelValue: e.deltaY, playerRef: regularPlayerRef.current.getInternalPlayer(), setVolumeValue, setIsMuted, isMuted }); showVolumePopup() }}
      tabIndex={0}
    >
      {partOfApp && <button className={showControls ? 'exit-app show' : 'exit-app'} type='button' onClick={() => partOfApp()}>X</button>}
      <ReactPlayer
        className='react-player'
        url={builtUrl()}
        ref={regularPlayerRef}
        autoPlay
        muted
        controls={false}
        playing={true}
        width="100%"
        height="100%"
        playbackRate={1}
        onPlay={() => handleProgressBar()}
      />
      <PlayerControls
        showControls={showControls}
        playerRef={regularPlayerRef}
        currentProgress={currentProgress}
        isPlaying={isPlaying}
        data={data.currentStream}
        type={type}
        setCurrentStream={setCurrentStream}
        playlist={playlist}
        setIsPlaying={setIsPlaying} />
      <div className={showVolumeNotification ? 'volume-notification-container show' : 'volume-notification-container'}>
        <img src={isMuted ? 'https://i.imgur.com/PaJOBjp.png' : 'https://i.imgur.com/9Y3Ybi0.png'} alt='mute-status-logo' />
        <div className='volume-bar-container'>
          <div className="volume-progress-bar" style={{ width: `${volumeValue * 100}%` }}></div>
        </div>
      </div>
    </div>
  )
}
