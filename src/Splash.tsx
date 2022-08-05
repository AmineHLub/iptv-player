import { useState } from 'react'
import iptvLogo from './Assets/iptv-logo.png'
import m3uLogo from './Assets/m3u-logo.png'
import xtreamLogo from './Assets/xtream-logo.png'
import Xtream from './Components/Xtream/XtreamLogin'

export default function Splash() {
  const [usingXtream, setUsingXtream] = useState(false)
  return (
    <div className="fixed-splash">
      {
        !usingXtream ? (
          <>
            <img src={iptvLogo} alt="splash-logo" />
            <div className="selection-container">
              <div className="selection upload-container">
                <img src={m3uLogo} alt="m3u-logo" />
                <button type="button" onClick={() => console.log("uploading")}>Upload M3U</button>
              </div>
              <div className="selection xtream-container">
                <img src={xtreamLogo} alt="xtream-logo" />
                <button type="button" onClick={() => setUsingXtream(true)}>XTREAM</button>
              </div>
            </div>
          </>
        ) : <Xtream setUsingXtream={setUsingXtream} />
      }
    </div>
  )
}
