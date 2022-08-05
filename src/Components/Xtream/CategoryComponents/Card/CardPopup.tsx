import CategoryDataTypes from './DataType'

type Props = {
  popupStreamInfo: CategoryDataTypes,
  setPopupStreamInfo: (popupStreamInfo: CategoryDataTypes | null) => void
}

export default function CardPopup({popupStreamInfo, setPopupStreamInfo}: Props) {
  
  const exitPopup = () => {
    setPopupStreamInfo(null)
  }

  console.log(popupStreamInfo)

  return (
    <div className="stream-info-popup"
    onClick={() => exitPopup()}
    >
      <div className="img-container">
        <img src={popupStreamInfo.stream_icon || popupStreamInfo.cover} alt="stream-cover" />
      </div>
      <div className="info-container">
        <h2>{popupStreamInfo.name}</h2>
      <div className="details-info">
      <div className='genre-specs'>
          <div className='genre'>
            <p>{popupStreamInfo.releaseDate || ''}{popupStreamInfo.genre || 'N/A'}</p>
          </div>
          <div className='rating'>
            <p>{popupStreamInfo.rating}</p>
            <img src='https://i.imgur.com/81I7vNr.png' alt='imdb-logo' />
          </div>
        </div>
          <div className='plot'>
            <p><strong>Plot: </strong>{popupStreamInfo.plot} ing elit. Recusandae rerum facere nemo odio alias illum reiciendis, laborum veritatis, deserunt ex placeat quos! Nam nostrum inventore hic molestias placeat distinctio debitis.</p>
          </div> 
      </div>
      </div>
      <div className="trailer-and-covers">
        <button className="trailer-btn">Watch Trailer</button>
        <div className='covers-container'>
          {
            popupStreamInfo.backdrop_path?.map((img, index) => (
              <div key={index} style={{backgroundImage: `url(https://i.imgur.com/JcImM53.png), url(${img})`}}>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
