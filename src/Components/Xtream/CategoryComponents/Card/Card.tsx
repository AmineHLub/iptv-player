import { useState } from 'react'
import CategoryDataTypes from './DataType'
import isValidUrl from '../../../Tools/isValidUrl'
import CardPopup from './CardPopup'

type PropTypes = {
  liveData: CategoryDataTypes
  type: string
}

export default function Card({ liveData, type }: PropTypes) {
  const { stream_id, series_id, stream_icon, cover, name } = liveData
  const [popupStreamInfo, setPopupStreamInfo] = useState(null as null | CategoryDataTypes)

  const handlingStreamInfo = (e: any, data: CategoryDataTypes) => {
    e.stopPropagation()
    if (document.querySelector('.category-content-wrapper') && !document.querySelector('.category-content-wrapper')?.classList.contains('hide-overflow')) {
      document.querySelector('.category-content-wrapper')?.classList.add('hide-overflow')
    }
    setPopupStreamInfo(data)
  }

  return (
    <>
      {
        popupStreamInfo && (
          <CardPopup
            popupStreamInfo={popupStreamInfo}
            setPopupStreamInfo={setPopupStreamInfo}
          />)
      }
      <div
        className={type !== 'live' ? 'card-wrapper not-live' : 'card-wrapper'}
        style={type !== 'live' && stream_icon ?
          { backgroundImage: `url(${stream_icon})`}
          : { backgroundImage: `url(${cover})`}}
        onClick={(e) => console.log('shouldnt')}
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
              src={isValidUrl(stream_icon) || isValidUrl(cover) || 'https://i.imgur.com/4nqxosG.png'}
              alt={name} />
          ) : null
        }
        <h2>{liveData.name.replace(/[^a-zA-Z0-9 \[|\]]/g, '')}</h2>
      </div>
    </>
  )
}
