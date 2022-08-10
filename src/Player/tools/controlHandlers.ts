

type wheelControls = {
  wheelValue:number
  playerRef: React.MutableRefObject<HTMLVideoElement>
  setIsMuted: (isMuted: boolean) => void
  setVolumeValue: (volumeValue: number) => void
  isMuted: boolean
}

type playerControls = {
  action: string // important
  playerRef: React.MutableRefObject<HTMLVideoElement> // important

  setIsPlaying?: (isPlaying: boolean) => void
  setIsFullScreen?: (isFullScreen: boolean) => void
  setIsMuted?: (isMuted: boolean) => void
  isPlaying?: boolean
  isFullScreen?: boolean
  isMuted?: boolean
}

export const handleWheelControls = ({wheelValue, playerRef, setIsMuted, setVolumeValue}:wheelControls) => {
  if (wheelValue < 0) { // wheel up
    if (playerRef.current.muted) {
      playerRef.current.muted = false
      setIsMuted(false)
    }
    playerRef.current.volume < 1 && (playerRef.current.volume += 0.2)
    setVolumeValue(playerRef.current.volume)
  }
  else { // wheel down
    if (playerRef.current.volume >= 0.2) {
      playerRef.current.volume -= 0.2
      setVolumeValue(playerRef.current.volume)
    } else {
      playerRef.current.muted = true;
      setIsMuted(true);
      setVolumeValue(0)
    } 
  }
}

export const controleHandler = ({action, isPlaying, playerRef, setIsPlaying, isFullScreen, setIsFullScreen,setIsMuted, isMuted}: playerControls) => {
    console.log(action)  
if (action ==='play' && setIsPlaying) {
      if (!isPlaying) {
        playerRef.current.play()
        setIsPlaying(true)
      }
      else {
        playerRef.current.pause()
        setIsPlaying(false)
      }
    }

    if(action ==='fullscreen' && setIsFullScreen) {
      if (isFullScreen) {
        document.exitFullscreen()
        setIsFullScreen(false)
      } else {
        document.body.requestFullscreen()
        setIsFullScreen(true)
      }
    }
    if (action ==='stop' && setIsPlaying) {
      playerRef.current.pause()
      playerRef.current.currentTime = 0
      setIsPlaying(false)
    }
    if ('mute' && setIsMuted) {
      playerRef.current.muted = !playerRef.current.muted
      setIsMuted(!isMuted)
    }
}