import { useEffect, useState, useContext } from 'react'
import '../../Stylesheets/xtreamui.scss'
import { getLiveCategories, getVodCategories, getStreamCategories } from '../Tools/getCategories'
import XtreamCategories from './CategoryComponents/XtreamCategories'
import iptvLogo from '../../Assets/iptv-logo.png'
import settings from '../../Assets/settings.png'
import logout from '../../Assets/logout.png'
import timeConverter from '../Tools/timeConverter'
import loadingGif from '../../Assets/Spinner-1.2s-231px.gif'
import { PlayListContext } from '../../Contexts/PlayListContext'

export default function XtreamDashboard() {
  const { playlist, setPlaylist } = useContext(PlayListContext as any)
  const [loadingComponent, setLoadingComponent] = useState(true)
  const [liveCategories, setLiveCategories] = useState([] as ({category_id:string | number, category_name:string})[])
  const [vodCategories, setVodCategories] = useState([] as ({category_id:string | number, category_name:string})[])
  const [seriesCategories, setSeriesCategories] = useState([] as ({category_id:string | number, category_name:string})[])
  const [streamType, setStreamType] = useState(null as null | ({category_id:string | number, category_name:string})[])
  useEffect(() => {
    getLiveCategories(playlist.url, playlist.user_info.username, playlist.user_info.password).then((data) => {
      setLiveCategories(data)
    })
    getVodCategories(playlist.url, playlist.user_info.username, playlist.user_info.password).then((data) => {
      setVodCategories(data)
    })
    getStreamCategories(playlist.url, playlist.user_info.username, playlist.user_info.password).then((data) => {
      setSeriesCategories(data)
      setLoadingComponent(false)
    })
    console.log(liveCategories, vodCategories, seriesCategories)
  }, [playlist])

  const loggingOut = () => {
    localStorage.removeItem('playlist')
    setPlaylist(null)
  }
  return (
    <>
      {
        loadingComponent ? (
          <div className='loading-component'>
            <img src={loadingGif} alt='loading' />
          </div>
        ) : null
      }
      <nav className="xtream-nav">
        <ul>
          <li className='iptv-logo'>
            <img src={iptvLogo} alt='xtream-logo' />
          </li>
          <p>{new Date().toDateString()}</p>
          <div className="nav-control">
            <li><img src={settings} alt='xtream-logo' /></li>
            <li><img src={logout} alt='xtream-logo' onClick={() => loggingOut()} /></li>
          </div>
        </ul>
      </nav>
      {
        !streamType ? (
          <>
            <main className='xtream-main'>
              <div className='xtream-main-content'>
                <div
                  className={liveCategories.length > 0 ? 'selection-card live-xtream' : 'selection-card live-xtream empty-xtream'}
                  onClick={() => setStreamType(liveCategories)}>
                  <img src="https://i.imgur.com/xmBrXQG.png" alt="live-xtream" />
                  <h3>{`${liveCategories.length} categories`}</h3>
                </div>
                <div
                  className={vodCategories.length > 0 ? 'selection-card vod-xtream' : 'selection-card vod-xtream empty-xtream'}
                  onClick={() => setStreamType(vodCategories)} >
                  <img src="https://i.imgur.com/WDhrMxV.png" alt="vod-xtream" />
                  <h3>{`${vodCategories.length} categories`}</h3>
                </div>
                <div
                  className={seriesCategories.length > 0 ? 'selection-card series-xtream' : 'selection-card series-xtream empty-xtream'}
                  onClick={() => setStreamType(seriesCategories)}>
                  <img src="https://i.imgur.com/HGzp076.png" alt="series-xtream" />
                  <h3>{`${seriesCategories.length} categories`}</h3>
                </div>
              </div>
            </main>
            <footer className="xtream-footer">
              <p><strong>Expiration:</strong> {timeConverter(playlist.user_info.exp_date) || playlist.user_info.exp_date}</p>
              <p><strong>Host:</strong> {playlist.url}</p>
            </footer>
          </>
        ) : (
          <XtreamCategories streamType={streamType} setStreamType={setStreamType} />
        )
      }
    </>
  )
}
