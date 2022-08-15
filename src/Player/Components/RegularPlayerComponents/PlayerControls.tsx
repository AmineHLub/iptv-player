import ReactPlayer from 'react-player'
import { useMemo } from 'react'
import { controleHandler } from '../../tools/controlHandlers'
import { livextreamPlaylist } from '../../PlayerPropTypes';



type Props = {
  showControls: boolean
  playerRef: React.MutableRefObject<ReactPlayer>
  currentProgress: { currentProgress: number, buffered: number }
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  data: livextreamPlaylist | undefined,
  type: string,
  setCurrentStream: Function,
  playlist?: livextreamPlaylist[] | undefined,
}

export default function PlayerControls({ playlist, setCurrentStream, showControls, playerRef, currentProgress, isPlaying, setIsPlaying, data, type }: Props) {

  const switchEpisode = (action: string) => {
    if(action === 'next') {
      if(playlist && playlist.indexOf(data!) < playlist.length - 1) {
        setCurrentStream(playlist[playlist.indexOf(data!) + 1])
        setIsPlaying(true)
      }
      } else {
        if(playlist && playlist.indexOf(data!) > 0) {
          setCurrentStream(playlist[playlist.indexOf(data!) - 1])
          setIsPlaying(true)
      }
    }
  }

  const videoDuration = useMemo(() => {
    if (playerRef.current) {
      return playerRef.current?.getDuration()
    }
  }, [playerRef.current?.getDuration()]) || 0

  const seekNewPosition = (e: any, type: string) => {
    if (type === 'directclick') {
      const newPercentage = Math.floor((e.nativeEvent.offsetX * 100) / e.target.offsetWidth)
      const newPosition = (newPercentage * videoDuration) / 100
      playerRef.current.seekTo(newPosition)
    }
  }

  const timeConverter = (type: string) => {
    if (type === 'current') {
      return new Date(currentProgress.currentProgress * 1000).toISOString().slice(11, 19) || 'N/A';
    } else if (type === 'duration') {
      return new Date(videoDuration * 1000).toISOString().slice(11, 19) || 'N/A';
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      className={showControls ? 'player-controls vod-series show' : 'player-controls vod-series'}
    >
      <div className="player-controls-header">
        <span>you're watching</span>
        <h2>{data?.name || data?.title.split('.').join(' ')}</h2>
      </div>
      <div className="progress-bar-container">
        <div className="click-bar-wrapper"
          onClick={(e) => seekNewPosition(e, 'directclick')} />
        <div className="progress-bar"
          style={{ width: `${(currentProgress.currentProgress * 100) / videoDuration}%` }}
        >
          <div className="progress-bar-indicator" />
        </div>
        <div className="buffered-bar"
          style={{ width: `${(currentProgress.buffered * 100) / videoDuration}%` }}
        />
      </div>
      <div className="player-control-details">
        <div className="player-control-details-left">
          <p>{timeConverter('current')}</p>
        </div>
        <div className="player-control-details-buttons">
          <div 
          onClick={() => switchEpisode('prev')}
          className={playlist && playlist.indexOf(data!) > 0 ? 'control-btn-container' : 'control-btn-container inactive'}>
            <img src='https://i.imgur.com/gRw96MF.png' alt='control-prev-button' />
          </div>
          <div className='control-btn-container'
          onClick={() => controleHandler({ action: 'play', playerRef: playerRef.current.getInternalPlayer(), isPlaying, setIsPlaying })}>
            <img src={isPlaying ? 'https://i.imgur.com/3yxbMss.png' : 'https://i.imgur.com/WtLzAou.png'} alt='play-pause-button' />
          </div>
          <div 
          onClick={() => switchEpisode('next')}
          className={playlist && playlist.indexOf(data!) < playlist.length - 1 ? 'control-btn-container' : 'control-btn-container inactive'}>
            <img src='https://i.imgur.com/RGs4jsD.png' alt='control-next-button' />
          </div>
        </div>
        <div className="player-control-details-right">
          <p>{timeConverter('duration')}</p>
        </div>
      </div>
    </div>
  )
}
