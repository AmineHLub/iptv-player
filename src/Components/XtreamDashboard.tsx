import { useEffect, useState } from 'react'
import '../Stylesheets/xtreamui.scss'
import iptvLogo from '../Assets/iptv-logo.png'
import settings from '../Assets/settings.png'
import logout from '../Assets/logout.png'
import timeConverter from './Tools/timeConverter'
import loadingGif from '../Assets/Spinner-1.2s-231px.gif'
import {getLiveCategories, getVodCategories, getStreamCategories} from './Tools/getCategories'

export default function XtreamDashboard({playlist, setPlaylist}: {playlist: any, setPlaylist: (playlist: any) => void}) {
  const [loadingComponent, setLoadingComponent] = useState(true)
  const [liveCategories, setLiveCategories]= useState([] as (string | number)[])
  const [vodCategories, setVodCategories] = useState([] as (string | number)[])
  const [seriesCategories, setSeriesCategories] = useState([] as (string | number)[])
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
        <li className='iptv-logo'><img src={iptvLogo} alt='xtream-logo' /></li>
        <p>{new Date().toDateString()}</p>
        <div className="nav-control">
        <li><img src={settings} alt='xtream-logo' /></li>
        <li><img src={logout} alt='xtream-logo' /></li>
        </div>
      </ul>
    </nav>
    <main className='xtream-main'>
      <div className='xtream-main-content'>
        <div className={liveCategories.length > 0 ? 'selection-card live-xtream' : 'selection-card live-xtream empty-xtream'}>
          <img src="https://i.imgur.com/xmBrXQG.png" alt="live-xtream" />
          <h3>{`${liveCategories.length} categories`}</h3>
        </div>
        <div className={vodCategories.length > 0 ? 'selection-card vod-xtream' : 'selection-card vod-xtream empty-xtream'} >
          <img src="https://i.imgur.com/WDhrMxV.png" alt="vod-xtream" />
          <h3>{`${vodCategories.length} categories`}</h3>
        </div>
        <div className={seriesCategories.length > 0 ? 'selection-card series-xtream' : 'selection-card series-xtream empty-xtream'}>
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
  )
}
