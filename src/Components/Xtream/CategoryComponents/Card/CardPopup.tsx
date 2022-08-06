import CategoryDataTypes from './DataType'
import Info from './Popup/Info'
import SeriePopup from './Popup/SeriePopup'

type Props = {
  popupStreamInfo: CategoryDataTypes,
  setPopupStreamInfo: (popupStreamInfo: CategoryDataTypes | null) => void,
}

export default function CardPopup({ popupStreamInfo, setPopupStreamInfo }: Props) {

  const { isNotForInfo } = popupStreamInfo

  const exitPopup = () => {
    setPopupStreamInfo(null)
  }

  return (
    <div className="stream-info-popup">
      <img className='exit-popup'
        src='https://i.imgur.com/VFWwoQL.png'
        alt='close-ico'
        onClick={() => exitPopup()}
      />
      {
        isNotForInfo ?
          <SeriePopup
            id={popupStreamInfo.series_id}
           /> 
           : (
            <Info
              popupStreamInfo={popupStreamInfo}
            />
          )
      }
    </div>
  )
}
