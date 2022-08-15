import { useState } from 'react'
import './Stylesheets/main-player-app.scss'
import LivePlayerContainer from './Components/LivePlayerContainer'
import VodSeriesPlayer from './Components/VodSeriesPlayer'
import { Props } from './PlayerPropTypes'

export default function Player({ live, notLive, partOfApp }: Props) {

  if (live) {
    var { xtreamData, playlist, hlsConfig } = live!
  }

  if (notLive) {
    var { xtreamData, playlist, type } = notLive!
  }
  
  const [currentStream, setCurrentStream] = useState(live?.selectedStreamId || notLive?.selectedStreamId || undefined)

  return (
    <>
      {
        live ? (
            <LivePlayerContainer
              partOfApp={partOfApp ? partOfApp : undefined}
              data={{ xtreamData, currentStream }}
              config={hlsConfig ? { ...hlsConfig } : false}
            />
        ) : (
            <VodSeriesPlayer 
            partOfApp={partOfApp ? partOfApp : undefined}
            data={{ xtreamData, currentStream }}
            type={type}
            setCurrentStream={setCurrentStream}
            playlist={playlist ? playlist : undefined}
            />
        )
      }
      {
        live && playlist ? (
          <div className='playlist-container' onMouseMove={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()}>
            {
              playlist && playlist.map((item) => (
                <div
                  key={item.stream_id}
                  className={currentStream?.stream_id && item.stream_id === currentStream.stream_id ? 'stream-container selected' : 'stream-container'}
                  onClick={() => setCurrentStream(item)}
                >
                  <img src={item.stream_icon} alt={item.name} />
                  <h2>{item.name}</h2>
                </div>
              ))
            }
          </div>
        ) : 
        notLive && playlist ? (
          <div className='playlist-container' onMouseMove={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()}>
          {
            playlist && playlist.map((item) => (
              <div
                key={item.id}
                className={currentStream?.id && item.id === currentStream.id ? 'stream-container selected' : 'stream-container'}
                onClick={() => setCurrentStream(item)}
              >
                <img src={item.info?.movie_image || item.info?.cover || item.info?.stream_icon} alt={(item.id).toString()} />
                <h2>{item.title.split('.').join(' ')}</h2>
              </div>
            ))
          }
        </div>
        ) : null
      }
    </>
  )
}
