import CategoryDataTypes from './DataType'
import validateUrl from '../../../Tools/validateUrl'

type PropTypes = {
  liveData: CategoryDataTypes
  type: string
  setPopupStreamInfo: (popupStreamInfo: null | CategoryDataTypes) => void
  setScrollValue: (scrollValue: number) => void
}

export default function Card({ liveData, type, setScrollValue, setPopupStreamInfo }: PropTypes) {
  const { stream_id, series_id, stream_icon, cover, name } = liveData

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

  return (
    <div
      className={type !== 'live' ? 'card-wrapper not-live' : 'card-wrapper'}
      style={styleBg()}
      onClick={type === 'series' ? (e) => handlingStreamInfo(e, {...liveData, isNotForInfo:true}) : () => console.log('shouldnt')}
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
  )
}
