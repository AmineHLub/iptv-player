import { useState, useRef, MutableRefObject, useEffect, useCallback } from 'react'
import ReactPlayer from 'react-player'

export default function VodSeriesPlayer() {
  const regularPlayerRef = useRef() as MutableRefObject<ReactPlayer>;

  return (
    <ReactPlayer
          url='http://103.161.35.25:25461/4K_OTT_Intro.mp4'
          ref={regularPlayerRef}
          autoPlay
          muted
          controls={false}
          playing={true}
          width="100%"
          height="100%"
          playbackRate={1}
        />
  )
}
