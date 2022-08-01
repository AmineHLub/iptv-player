import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Splash from "./Splash"
import XtreamDashboard from './Components/XtreamDashboard';
import { reCheckLogin } from './Components/Tools/getCategories';
function App() {
  const [playlist, setPlaylist] = useState(null)
  useEffect(() => {
    const loadedData = JSON.parse(localStorage.getItem('playlist') || '[]')
    if (loadedData && loadedData !== []) {
      reCheckLogin(loadedData.url, loadedData.user_info.username ,loadedData.user_info.password).then((response) => {
        if (response) {
          setPlaylist(loadedData)
        }
      })
    }
  }
    , [])
  return (
    <div className="App">
      <ToastContainer />
      {
        !playlist ? <Splash setPlaylist={setPlaylist} /> : <XtreamDashboard playlist={playlist} setPlaylist={setPlaylist} />
      }
    </div>
  )
}

export default App
