import { useState, useRef, MutableRefObject, useEffect } from 'react'
// types
import { EpgInfoTypes, VideoInfoTypes } from './LiveComponents/Types/LiveTypes';

// components
import ReactHlsPlayer from 'react-hls-player';
import LiveControlComponent from './LiveComponents/LiveControlComponent';

// tools
import getFrameratesInfo from '../tools/getFrameratesInfo';
import getLiveEpg from '../tools/getLiveEpg';
import getLiveInfo from '../tools/getLiveInfo';

type Props = {
  showControls: boolean,
}

export default function LivePlayerContainer({ showControls }: Props) {

  const url = '//'
  // Refs
  const livePlayerRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const fpsRef = useRef() as MutableRefObject<HTMLParagraphElement>;
  
  // hooks
  const [videoInformation, setVideoInformation] = useState(null as null | VideoInfoTypes)
  const [epgInfo, setEpgInfo] = useState([] as [] | EpgInfoTypes[])
  const [isPlaying, setIsPlaying] = useState(true as boolean)
  const [isFullScreen, setIsFullScreen] = useState(false as boolean)
  const [isMuted, setIsMuted] = useState(true as boolean)

  const controleHandler = (action: string) => {
    switch (action) {
      case 'play':
        if (!isPlaying) {
          livePlayerRef.current.play()
          setIsPlaying(true)
        }
        else {
          livePlayerRef.current.pause()
          setIsPlaying(false)
        }
        break;
      case 'fullscreen':
        if (isFullScreen) {
          document.exitFullscreen()
          setIsFullScreen(false)
        } else {
          document.body.requestFullscreen()
          setIsFullScreen(true)
        }
        break;
      case 'stop':
        livePlayerRef.current.pause()
        livePlayerRef.current.currentTime = 0
        setIsPlaying(false)
        break;
        case 'mute':
            livePlayerRef.current.muted = !livePlayerRef.current.muted
            setIsMuted(!isMuted)
          break;
      default:
        break;
    }
  }

  const onPlayVideo = () => {
    getLiveInfo({livePlayerRef, setVideoInformation})
  }

  useEffect(() => {
    livePlayerRef.current.addEventListener('play', onPlayVideo);
    getLiveEpg({setEpgInfo})
    return () => {
      livePlayerRef.current.removeEventListener('play', onPlayVideo);
    }
  }, []);

  return (
    <div className='main-player-container'
      onMouseEnter={() => getFrameratesInfo(document.querySelector('video')!, fpsRef)}
    >
      <ReactHlsPlayer
        playerRef={livePlayerRef}
        src={url}
        autoPlay={true}
        controls={false}
        muted={true}
        width="100%"
        height="100%"
        onClick={() => controleHandler('play')}
        onDoubleClick={() => controleHandler('fullscreen')}
      />
      <LiveControlComponent
        getFrameratesInfo={getFrameratesInfo}
        fpsRef={fpsRef}
        isPlaying={isPlaying}
        controleHandler={controleHandler}
        epgInfo={epgInfo}
        videoInformation={videoInformation}
        showControls={showControls}
      />
    </div>
  )
}
