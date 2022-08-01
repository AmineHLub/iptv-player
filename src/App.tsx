import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Splash from "./Splash"
import XtreamDashboard from './Components/XtreamDashboard';
function App() {
  const [playlist, setPlaylist] = useState(null)
  return (
    <div className="App">
      <ToastContainer />
      {
        !playlist ? <Splash setPlaylist={setPlaylist} /> : <XtreamDashboard playlist={playlist} />
      }
    </div>
  )
}

export default App
