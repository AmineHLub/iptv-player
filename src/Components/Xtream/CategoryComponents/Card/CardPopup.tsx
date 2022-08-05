import CategoryDataTypes from './DataType'
import Info from './Popup/Info'

type Props = {
  popupStreamInfo: CategoryDataTypes,
  setPopupStreamInfo: (popupStreamInfo: CategoryDataTypes | null) => void,
}

export default function CardPopup({ popupStreamInfo, setPopupStreamInfo }: Props) {

  const  { isNotForInfo } = popupStreamInfo
  console.log(isNotForInfo)

  const exitPopup = () => {
    setPopupStreamInfo(null)
  }

  console.log(popupStreamInfo)

  return (
    <div className="stream-info-popup"
    onClick={() => exitPopup()}
  >
    {
      isNotForInfo ? 
      <div>series</div> : (
        <Info
        popupStreamInfo={popupStreamInfo}
        />
      )
    }
  </div>
  )
}
