import CategoryDataTypes from './DataType'

type Props = {
  popupStreamInfo: CategoryDataTypes,
  setPopupStreamInfo: (popupStreamInfo: CategoryDataTypes | null) => void
}

export default function CardPopup({popupStreamInfo, setPopupStreamInfo}: Props) {
  
  const MainWraperElement = document.querySelector('.category-content-wrapper') as HTMLElement
  
  const exitPopup = () => {
    if (MainWraperElement && (MainWraperElement.classList.contains('hide-overflow'))) 
     {
      MainWraperElement.classList.remove('hide-overflow')
    }
    setPopupStreamInfo(null)
  }

  const style = {
    width: `calc(100% - ${MainWraperElement.offsetLeft}px)`,
    }

  return (
    <div className="stream-info-popup"
    style={style}
    onClick={() => exitPopup()}
    >
      <div className="img-container">
        <img src={popupStreamInfo.stream_icon || popupStreamInfo.cover} alt="stream-info" />
      </div>
      <div className="info-container">
        <h2>{popupStreamInfo.name}</h2>
        <div className='genre-specs'>
          <div className='genre'>
            <p>{popupStreamInfo.releaseDate || ''}{popupStreamInfo.genre || 'N/A'}</p>
          </div>
          <div className='rating'>
            <p>{popupStreamInfo.rating}</p>
            <img src='https://i.imgur.com/81I7vNr.png' alt='imdb-logo' />
          </div>
        </div>
      </div>
    </div>
  )
}
