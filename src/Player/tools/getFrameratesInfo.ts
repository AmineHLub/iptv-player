import {MutableRefObject} from "react";

export default function getFrameratesInfo(video_elem: HTMLVideoElement, fpsRef:MutableRefObject<HTMLParagraphElement>) {
  if (!(parseInt(fpsRef.current.innerText) >= 30)) {
    let getframerates = video_elem?.getVideoPlaybackQuality().totalVideoFrames
    setTimeout(function () {
      getframerates = video_elem?.getVideoPlaybackQuality().totalVideoFrames - getframerates;
      if (getframerates === 0) {
        getFrameratesInfo(video_elem, fpsRef);
      }
      else {
          fpsRef.current.innerText = `FPS: ${getframerates}`
      }
    }, 1000)
  }
}
