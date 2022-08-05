import CategoryDataTypes from './DataType'

type Props = {
  popupStreamInfo: CategoryDataTypes,
  setPopupStreamInfo: (popupStreamInfo: CategoryDataTypes | null) => void,
}

export default function CardPopup({ popupStreamInfo, setPopupStreamInfo }: Props) {

  const {
    stream_icon, cover, youtube_trailer,
    backdrop_path, name, genre, releaseDate,
    rating, plot } = popupStreamInfo

  const exitPopup = () => {
    setPopupStreamInfo(null)
  }

  console.log(popupStreamInfo)

  return (
    <div className="stream-info-popup"
      onClick={() => exitPopup()}
    >
      <div className="img-container">
        <img src={stream_icon || cover} alt="stream-cover" />
      </div>
      <div className="info-container">
        <h2>{name}</h2>
        <div className="details-info">
          <div className='genre-specs'>
            <div className='genre'>
              <p>{releaseDate || ''}{' | '}{genre || 'N/A'}</p>
            </div>
            <div className='rating'>
              <p>{rating}</p>
              <img src='https://i.imgur.com/81I7vNr.png' alt='imdb-logo' />
            </div>
          </div>
          <div className='plot'>
            <p><strong>Plot: </strong>{plot ? plot : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="trailer-and-covers">
        <div className="trailer-container">
          <a
            href={youtube_trailer && `https://www.youtube.com/watch?v=${youtube_trailer}`}
            target="_blank"
            className={!youtube_trailer ? 'disabled' : ''}
          >Watch Trailer</a>
        </div>
        <div className='covers-container'>
          {
            backdrop_path?.slice(0, 4).map((img, index) => (
              <div key={index} style={{ backgroundImage: `url(https://i.imgur.com/JcImM53.png), url(${img})` }}>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
