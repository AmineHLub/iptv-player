import { useState, useRef, MutableRefObject, useEffect, KeyboardEvent } from 'react'
// types
import { EpgInfoTypes, VideoInfoTypes } from './LiveComponents/Types/LiveTypes';
import { xtreamData, livextreamPlaylist } from '../PlayerPropTypes';
// components
import ReactHlsPlayer from 'react-hls-player';
import LiveControlComponent from './LiveComponents/LiveControlComponent';
// tools
import getFrameratesInfo from '../tools/getFrameratesInfo';
import getLiveEpg from '../tools/getLiveEpg';
import getLiveInfo from '../tools/getLiveInfo';
import { handleWheelControls, controleHandler } from '../tools/controlHandlers'

type Props = {
  data: {
    xtreamData: xtreamData,
    currentStream: livextreamPlaylist | undefined,
  },
  config: object | boolean,
  partOfApp?: Function | undefined,
}

export default function LivePlayerContainer({ data, config, partOfApp }: Props) {

    const { xtreamData, currentStream } = data    
    // Refs
  const livePlayerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const fpsRef = useRef() as MutableRefObject<HTMLParagraphElement>;

  // hooks
  const [videoInformation, setVideoInformation] = useState(null as null | VideoInfoTypes)
  const [epgInfo, setEpgInfo] = useState([] as [] | EpgInfoTypes[])
  const [isPlaying, setIsPlaying] = useState(true as boolean)
  const [isFullScreen, setIsFullScreen] = useState(false as boolean)
  const [isMuted, setIsMuted] = useState(true as boolean)
  const [volumeValue, setVolumeValue] = useState(0 as number)
  const [mousePos, setMousePos] = useState(null as null | number)
  const [showVolumeNotification, setShowVolumeNotification] = useState(false as boolean)
  const [showControls, setShowControls] = useState(false as boolean)

  const toggleControls = (e:any) => {
    setShowControls(true)
    setMousePos(e.clientX)
    setTimeout(() => {
      if(e.clientX === mousePos) {
        setShowControls(false)
      }
    }, 4000)
  }

  const onPlayVideo = () => {
    getLiveInfo({ livePlayerRef, setVideoInformation })
  }

  useEffect(() => {
    livePlayerRef.current?.addEventListener('play', onPlayVideo);
    getLiveEpg({ setEpgInfo, streamId: currentStream?.stream_id, xtreamData })
    return () => {
      livePlayerRef.current?.removeEventListener('play', onPlayVideo);
    }
  }, [data]);

    // interractions & GUI control
  
    const untoggleVolumePopup = setTimeout(() => {
      setShowVolumeNotification(false)
    }, 3000)
    const showVolumePopup = () => {
      setShowVolumeNotification(true)
      clearTimeout(untoggleVolumePopup)
    }
  
    const handleKeyActions = (key: string) => {
      switch (key) {
        case ' ':
          controleHandler({ action: 'play', playerRef: livePlayerRef.current, isPlaying, setIsPlaying })
          break;
        case 'f':
          controleHandler({ action: 'fullscreen', playerRef: livePlayerRef.current, isFullScreen, setIsFullScreen })
          break;
        case 'm':
          controleHandler({ action: 'mute', playerRef: livePlayerRef.current, isMuted, setIsMuted })
          break;
        case 'ArrowUp':
          handleWheelControls({ wheelValue: -10, playerRef: livePlayerRef.current, setVolumeValue, setIsMuted, isMuted })
          showVolumePopup()
          break;
        case 'ArrowDown':
          handleWheelControls({ wheelValue: +10, playerRef: livePlayerRef.current, setVolumeValue, setIsMuted, isMuted })
          showVolumePopup()
      }
    }

  return (
    <div className="player-app-container"
      tabIndex={0}
      onMouseMove={(e) => toggleControls(e)}
      onDoubleClick={() => controleHandler({ action: 'fullscreen', playerRef: livePlayerRef.current, isFullScreen, setIsFullScreen })}
      onKeyDown={(e) => handleKeyActions(e.key)}
      onWheel={(e) => { handleWheelControls({ wheelValue: e.deltaY, playerRef: livePlayerRef.current, setVolumeValue, setIsMuted, isMuted }); showVolumePopup() }}
    >
      {partOfApp && <button className={showControls ? 'exit-app show' : 'exit-app'} type='button' onClick={() => partOfApp()}>X</button>}
      <div className='main-player-container'
        onMouseEnter={() => getFrameratesInfo(document.querySelector('video')!, fpsRef)}
      >
        <ReactHlsPlayer
          playerRef={livePlayerRef}
          src={`http://${xtreamData.url}/live/${xtreamData.user_info.username}/${xtreamData.user_info.password}/${currentStream?.stream_id}.m3u8`}
          autoPlay
          controls={false}
          loop
          muted
          width="100%"
          height="100%"
          onClick={() => controleHandler({ action: 'play', playerRef: livePlayerRef.current, isPlaying, setIsPlaying })}
          hlsConfig={config}
        />
        <LiveControlComponent
          getFrameratesInfo={getFrameratesInfo}
          fpsRef={fpsRef}
          isPlaying={isPlaying}
          epgInfo={epgInfo}
          channelName={currentStream?.name!}
          videoInformation={videoInformation}
          showControls={showControls}
          playerRef={livePlayerRef}
          setIsPlaying={setIsPlaying}
          isMuted={isMuted}
          volumeValue={volumeValue}
        />
        <div className={showVolumeNotification ? 'volume-notification-container show' : 'volume-notification-container'}>
          <img src={isMuted ? 'https://i.imgur.com/PaJOBjp.png' : 'https://i.imgur.com/9Y3Ybi0.png'} alt='mute-status-logo' />
          <div className='volume-bar-container'>
            <div className="volume-progress-bar" style={{ width: `${volumeValue * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
