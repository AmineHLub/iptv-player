import { useState } from 'react'
import xtreamLogo from '../Assets/xtream-logo.png'
import OpenEye from '../Assets/openpwd.png'
import ClosedEye from '../Assets/closedpwd.png'

export default function Xtream({ setUsingXtream }: { setUsingXtream: (active: boolean) => void }) {
  const [viewPwd, setCiewPwd] = useState(false)
  return (
    <>
      <button className="xtream-goback" type="button" onClick={() => setUsingXtream(false)} />
      <div className="xtream-container-content">
        <img className="xtream-dash-logo" alt="xtream-logo" src={xtreamLogo} />
        <form className="xtream-data">
          <div>
            <label htmlFor="xtream-host">Host</label>
            <input type="text" id="xtream-host" />
          </div>
          <div>
            <label htmlFor="xtream-port">Port</label>
            <input type="number" id="xtream-port" />
          </div>
          <div>
            <label htmlFor="xtream-username">Username</label>
            <input type="text" id="xtream-username" />
          </div>
          <div className="pwd-container">
            <label htmlFor="xtream-password">Password</label>
            <input type={!viewPwd ? 'password' : 'text'} id="xtream-password" />
            <button 
            className="show-pwd-xtream"
            type="button"
            onClick={() => setCiewPwd(!viewPwd)}
            style={!viewPwd ? {backgroundImage: `url(${ClosedEye})`} : {backgroundImage: `url(${OpenEye})`}} />
          </div>
          <button className="submit-xtream-details" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  )
}


