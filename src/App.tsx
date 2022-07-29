import { useState } from 'react'
import iptvLogo from './Assets/iptv-logo.png'
import m3uLogo from './Assets/m3u-logo.png'
import xtreamLogo from './Assets/xtream-logo.png'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <div className="fixed-splash">
        <img src={iptvLogo} alt='splash-logo' />
        <div className="selection-container">
          <div className="selection upload-container">
            <img src={m3uLogo} alt='' />
            <button>Upload M3U</button>
          </div>
          <div className="selection xtream-container">
          <img src={xtreamLogo} alt='' />
            <button>XTREAM</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
