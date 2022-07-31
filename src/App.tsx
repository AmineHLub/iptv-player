import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Splash from "./Splash"
function App() {
  const [playlist, setPlaylist] = useState(null)
  return (
    <div className="App">
      <ToastContainer />
      <Splash setPlaylist={setPlaylist} />
    </div>
  )
}

export default App
