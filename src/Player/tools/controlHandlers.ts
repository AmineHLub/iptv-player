

type wheelControls = {
  wheelValue:number
  playerRef: any
  setIsMuted: (isMuted: boolean) => void
  setVolumeValue: (volumeValue: number) => void
  isMuted: boolean
}

type playerControls = {
  action: string // important
  playerRef: any // important

  setIsPlaying?: (isPlaying: boolean) => void
  setIsFullScreen?: (isFullScreen: boolean) => void
  setIsMuted?: (isMuted: boolean) => void
  isPlaying?: boolean
  isFullScreen?: boolean
  isMuted?: boolean
}

export const handleWheelControls = ({wheelValue, playerRef, setIsMuted, setVolumeValue}:wheelControls) => {
  if (wheelValue < 0) { // wheel up
    if (playerRef.muted) {
      playerRef.muted = false
      setIsMuted(false)
      playerRef.volume = 0.2
      setVolumeValue(playerRef.volume)
    } else {
      if (playerRef.volume < 1) {
        playerRef.volume += 0.2
        setVolumeValue(playerRef.volume)
      }
    }

  }
  else { // wheel down
    if (playerRef.volume > 0.3) {
      playerRef.volume -= 0.2
      setVolumeValue(playerRef.volume)
    } else {
      playerRef.muted = true;
      setIsMuted(true);
      setVolumeValue(0)
    } 
  }
}

export const controleHandler = ({action, isPlaying, playerRef, setIsPlaying, isFullScreen, setIsFullScreen,setIsMuted, isMuted}: playerControls) => {
if (action ==='play' && setIsPlaying) {
      if (!isPlaying) {
        playerRef.play()
        setIsPlaying(true)
      }
      else {
        playerRef.pause()
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
      playerRef.pause()
      playerRef.currentTime = 0
      setIsPlaying(false)
    }
    if ('mute' && setIsMuted) {
      playerRef.muted = !playerRef.muted
      setIsMuted(!isMuted)
    }
}