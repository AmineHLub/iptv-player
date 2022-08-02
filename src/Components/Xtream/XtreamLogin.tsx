import { useState, useContext } from 'react'
import xtreamLogo from '../../Assets/xtream-logo.png'
import OpenEye from '../../Assets/openpwd.png'
import ClosedEye from '../../Assets/closedpwd.png'
import checkAndSubmit from '../Tools/checkAndSubmit'
import { PlayListContext} from '../../Contexts/PlayListContext'


export default function Xtream({ setUsingXtream }: { setUsingXtream: (active: boolean) => void }) {
  const { setPlaylist } = useContext(PlayListContext as any)
  const [viewPwd, setCiewPwd] = useState(false)
  const [data, setData] = useState({
    host: '',
    port: '80',
    username: '',
    password: '',
  })

  const xtreamLogging: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let fetchedData:{validity:boolean, data:object};
    try{
      fetchedData = await checkAndSubmit(data);
      setPlaylist(fetchedData.data)
      localStorage.setItem('playlist', JSON.stringify(fetchedData.data))
      setUsingXtream(false)
    }
    catch(e){
      console.log('DATA IS INVALID')
    }
  }

  const changeData = (type: string, value: string) => {
    switch (type) {
      case 'host':
        setData({ ...data, host: value })
        break
      case 'port':
        setData({ ...data, port: value })
        break
      case 'username':
        setData({ ...data, username: value })
        break
      case 'password':
        setData({ ...data, password: value })
        break
      default:
        break
    }
  }
  return (
    <>
      <button className="xtream-goback" type="button" onClick={() => setUsingXtream(false)} />
      <div className="xtream-container-content">
        <img className="xtream-dash-logo" alt="xtream-logo" src={xtreamLogo} />
        <form onSubmit={(e) => xtreamLogging(e)} className="xtream-data">
          <div>
            <label htmlFor="xtream-host">Host</label>
            <input type="text" id="xtream-host" onChange={(e) => changeData("host", e.target.value)} />
          </div>
          <div>
            <label htmlFor="xtream-port">Port</label>
            <input type="number" id="xtream-port" placeholder='80' onChange={(e) => changeData("port", e.target.value)} />
          </div>
          <div>
            <label htmlFor="xtream-username">Username</label>
            <input type="text" id="xtream-username" autoComplete="username" onChange={(e) => changeData("username", e.target.value)} />
          </div>
          <div className="pwd-container">
            <label htmlFor="xtream-password">Password</label>
            <input type={!viewPwd ? 'password' : 'text'} autoComplete="password" id="xtream-password" onChange={(e) => changeData("password", e.target.value)} />
            <button
              className="show-pwd-xtream"
              type="button"
              onClick={() => setCiewPwd(!viewPwd)}
              style={!viewPwd ? { backgroundImage: `url(${ClosedEye})` } : { backgroundImage: `url(${OpenEye})` }} />
          </div>
          <button
            className={(data.host && data.port && data.username && data.password) ? "submit-xtream-details" : "submit-xtream-details inactive-btn"}
            type="submit"
            disabled={!(data.host && data.port && data.username && data.password)}
          >
            Login
          </button>
        </form>
      </div>
    </>
  )
}


