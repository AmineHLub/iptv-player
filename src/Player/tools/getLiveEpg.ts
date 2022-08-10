import axios from "axios"
import {EpgInfoTypes} from '../Components/LiveComponents/Types/LiveTypes'
type Props = {
  setEpgInfo: (epgInfo:[] | EpgInfoTypes[]) => void
}

const getLiveEpg = ({setEpgInfo}:Props) => {
  try {
    axios.get('http://line.4k-ott.com:80/player_api.php?username=F253D2&password=5A8D30&action=&action=get_short_epg&stream_id=347279&&limit=2')
      .then((res) => {
        setEpgInfo(res.data.epg_listings)
      })
  }
  catch {
    console.log('error')
    setEpgInfo([])
  }
  console.log('did it')
  setTimeout(() => {
    getLiveEpg({setEpgInfo})
  }, 5 * 60000) // every 5 minutes
}

export default getLiveEpg