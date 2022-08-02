import { useEffect, useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Splash from "./Splash"
import XtreamDashboard from './Components/Xtream/XtreamDashboard';
import { reCheckLogin } from './Components/Tools/getCategories';
import { PlayListContext} from './Contexts/PlayListContext'

function App() {
  const { playlist, setPlaylist } = useContext(PlayListContext as any)
  useEffect(() => {
    const loadedData = JSON.parse(localStorage.getItem('playlist') || '[]')
    if (loadedData && loadedData !== [] && loadedData.user_info?.username && loadedData.user_info?.password) {
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
        !playlist ? <Splash /> : <XtreamDashboard />
      }
    </div>
  )
}

export default App
