import { useContext, useState } from 'react'
import CategoryDataTypes from './DataType'
import validateUrl from '../../../Tools/validateUrl'
import { PlayListContext } from '../../../../Contexts/PlayListContext'
import Player from '../../../../Player/Player'

type PropTypes = {
  liveData: CategoryDataTypes
  type: string
  setPopupStreamInfo: (popupStreamInfo: null | CategoryDataTypes) => void
  setScrollValue: (scrollValue: number) => void
  categoryData: CategoryDataTypes[]
}

export default function Card({ liveData, type, setScrollValue, setPopupStreamInfo, categoryData }: PropTypes) {
  const { stream_id, series_id, stream_icon, cover, name } = liveData
  const { playlist } = useContext(PlayListContext as any)
  const [mountedPlayer, setMountedPlayer] = useState(null as any)

  const styleBg = () => {
    if (type !== 'live') {
      if (stream_icon) {
        return { backgroundImage: `url(${stream_icon}), url("https://i.imgur.com/JcImM53.png")` }
      } else
        return { backgroundImage: `url(${cover}), url("https://i.imgur.com/JcImM53.png")` }
    }
  }

  const handlingStreamInfo = (e: any, data: CategoryDataTypes) => {
    e.stopPropagation()
    if (document.querySelector('.category-content-wrapper')) {
      setScrollValue(document.querySelector('.category-content-wrapper')?.scrollTop || 0)
    }
    setPopupStreamInfo(data)
  }

  const handleCardOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => {
    switch (type) {
      case 'live':
        const live = {
          selectedStreamId: liveData,
          playlist: categoryData,
          xtreamData: playlist,
        }
        setMountedPlayer({
          type: 'live',
          data: live,
        })
        break
      case 'series':
        handlingStreamInfo(e, { ...liveData, isNotForInfo: true })
        break
      case 'vod':
        const notLive = {
          type: 'vod',
          selectedStreamId: liveData,
          xtreamData: playlist,
        }
        setMountedPlayer({
          type: 'notLive',
          data: notLive,
        })
        break
      default:
        break
    }
  }

  return (
    <>
    <div
      className={type !== 'live' ? 'card-wrapper not-live' : 'card-wrapper'}
      style={styleBg()}
      onClick={(e) => handleCardOnClick(e, type)}
    >
      <img
        className='information'
        onClick={(e) => handlingStreamInfo(e, liveData)}
        src='https://i.imgur.com/hnB4y5u.png'
        alt='stream-info' />
      {
        type === 'live' ? (
          <img
            className='live-icon'
            loading="lazy"
            src={validateUrl(stream_icon) || validateUrl(cover) || 'https://i.imgur.com/4nqxosG.png'}
            alt={name} />
        ) : null
      }
      <h2>{liveData.name.replace(/[^a-zA-Z0-9 \[|\]]/g, '')}</h2>
    </div>
    { mountedPlayer?.type === 'live' ? <Player live={mountedPlayer.data} partOfApp={() => setMountedPlayer(null)} /> :
     mountedPlayer?.type === 'notLive' ? <Player notLive={mountedPlayer.data} partOfApp={() => setMountedPlayer(null)} /> : null }
    </>
  )
}
