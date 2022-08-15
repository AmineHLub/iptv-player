import React from 'react'
import { VideoInfoTypes } from '../Components/LiveComponents/Types/LiveTypes'
type Props = {
  livePlayerRef: React.MutableRefObject<HTMLVideoElement>,
  setVideoInformation: (videoInformation: null | VideoInfoTypes) => void
}

const getLiveInfo = ({livePlayerRef, setVideoInformation}:Props) => {
  if (livePlayerRef.current.videoHeight) { // video running
    // getting static info
    const resolution = `${livePlayerRef.current.videoWidth} x ${livePlayerRef.current.videoHeight}`
    const isHD = livePlayerRef.current.videoHeight >= 720 ? true : false
    const duration = livePlayerRef.current.duration
    const allData: any = {
      resolution,
      width: livePlayerRef.current.videoWidth,
      height: livePlayerRef.current.videoHeight,
      isHD,
      isFourK: livePlayerRef.current.videoWidth >= 3840,
      duration: new Date(duration * 1000).toISOString().substring(14, 19),
    }
    setVideoInformation(allData)
  } else {
    setTimeout(() => getLiveInfo({livePlayerRef, setVideoInformation}), 2000)
  }
}

export default getLiveInfo