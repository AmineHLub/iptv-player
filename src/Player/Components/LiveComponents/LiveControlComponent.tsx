import { Base64 } from 'js-base64';
import epgTimeConverter from '../../tools/epgTimeConverter';
import { EpgInfoTypes, VideoInfoTypes } from './Types/LiveTypes';
import { controleHandler } from '../../tools/controlHandlers'


type Props = {
  getFrameratesInfo: any,
  fpsRef: any,
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void,
  epgInfo: [] | EpgInfoTypes[],
  videoInformation: null  | VideoInfoTypes,
  showControls: boolean,
  playerRef: React.MutableRefObject<HTMLVideoElement>,
}

export default function LiveControlComponent({
   getFrameratesInfo,
   fpsRef,
   isPlaying,
   epgInfo,
   videoInformation,
   showControls,
   setIsPlaying,
   playerRef,
  }: Props) {
    
  return (
    <div
    className={showControls ? 'player-controls show' : 'player-controls'}
    onMouseEnter={() => getFrameratesInfo(document.querySelector('video')!, fpsRef)}
  >
    <div className="channel-header">
      <h2>
        <img 
        src={isPlaying ? 'https://i.imgur.com/iIX7eWV.png' : 'https://i.imgur.com/uIcuumh.png'} alt='logo-play-stop'
        onClick={() => isPlaying?  {action : 'stop', playerRef, isPlaying, setIsPlaying} : {action : 'play', playerRef, isPlaying, setIsPlaying}} />
        Bein Sports Premium 2 HD
        </h2>
      <p>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', })}</p>
    </div>
    <div className="channel-info">
      <div className="channel-info-epg-container">
        <p>{epgTimeConverter(epgInfo[0]?.start, epgInfo[0]?.end)} : {epgInfo.length ? Base64.decode(epgInfo[0]?.title) : 'No program data'} </p>
        <p>{epgTimeConverter(epgInfo[1]?.start, epgInfo[1]?.end)} : {epgInfo.length > 1 ? Base64.decode(epgInfo[1]?.title) : 'No program data'}</p>
      </div>
      <div className="channel-info-codec-container">
        <p>{videoInformation ? videoInformation.resolution : ''}</p>
        <p ref={fpsRef}>0</p>
        <div className='icons-container'>
          <img src='https://i.imgur.com/NavkSgj.png'
          style={epgInfo.length ? { opacity: 1 } : { opacity: 0.3 }} alt='epg' />

          <img src='https://i.imgur.com/qbWgMuH.png'
            style={videoInformation && videoInformation.isFourK ? { opacity: 1 } : { opacity: 0.3 }} alt='4k' />
          <img src='https://i.imgur.com/ewQp6P6.png'
            style={videoInformation && videoInformation.isHD ? { opacity: 1 } : { opacity: 0.3 }} alt='hd' />
          <img src='https://i.imgur.com/6mfk1Qw.png'
            style={(videoInformation && (videoInformation.width / videoInformation.height) >= 16 / 9) ? { opacity: 1 } : { opacity: 0.3 }}
            alt='a-ration' />
        </div>
      </div>
    </div>
  </div>
  )
}
