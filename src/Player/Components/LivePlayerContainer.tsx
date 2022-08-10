import { useState, useRef, MutableRefObject, useEffect, KeyboardEvent } from 'react'
// types
import { EpgInfoTypes, VideoInfoTypes } from './LiveComponents/Types/LiveTypes';

// components
import ReactHlsPlayer from 'react-hls-player';
import LiveControlComponent from './LiveComponents/LiveControlComponent';

// tools
import getFrameratesInfo from '../tools/getFrameratesInfo';
import getLiveEpg from '../tools/getLiveEpg';
import getLiveInfo from '../tools/getLiveInfo';
import { controleHandler } from '../tools/controlHandlers'

type Props = {
  showControls: boolean,
  livePlayerRef: MutableRefObject<HTMLVideoElement>,
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void,
  isMuted: boolean,
  volumeValue: number,
}

export default function LivePlayerContainer({
  showControls,
  livePlayerRef,
  setIsPlaying,
  isPlaying,
  isMuted,
  volumeValue }: Props) {

  const url = '//'
  // Refs
  const fpsRef = useRef() as MutableRefObject<HTMLParagraphElement>;

  // hooks
  const [videoInformation, setVideoInformation] = useState(null as null | VideoInfoTypes)
  const [epgInfo, setEpgInfo] = useState([] as [] | EpgInfoTypes[])

  const onPlayVideo = () => {
    getLiveInfo({ livePlayerRef, setVideoInformation })
  }

  useEffect(() => {
    livePlayerRef.current?.addEventListener('play', onPlayVideo);
    getLiveEpg({ setEpgInfo, streamId: '147977'})
    return () => {
      livePlayerRef.current?.removeEventListener('play', onPlayVideo);
    }
  }, []);

  return (
    <div className='main-player-container'
      onMouseEnter={() => getFrameratesInfo(document.querySelector('video')!, fpsRef)}
    >
      <ReactHlsPlayer
        playerRef={livePlayerRef}
        src={url}
        autoPlay
        controls={false}
        onVolumeChange={(volume) => console.log(volume)}
        loop
        muted
        width="100%"
        height="100%"
        onClick={() => controleHandler({ action: 'play', playerRef: livePlayerRef, isPlaying, setIsPlaying })}
      />
      <LiveControlComponent
        getFrameratesInfo={getFrameratesInfo}
        fpsRef={fpsRef}
        isPlaying={isPlaying}
        epgInfo={epgInfo}
        videoInformation={videoInformation}
        showControls={showControls}
        playerRef={livePlayerRef}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        volumeValue={volumeValue}
      />
    </div>
  )
}
