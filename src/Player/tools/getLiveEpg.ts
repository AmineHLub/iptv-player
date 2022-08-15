import axios from "axios"
import {EpgInfoTypes} from '../Components/LiveComponents/Types/LiveTypes'
import {xtreamData} from '../PlayerPropTypes'

type Props = {
  setEpgInfo: (epgInfo:[] | EpgInfoTypes[]) => void
  streamId?: number | string
  xtreamData: xtreamData
}

const getLiveEpg = ({setEpgInfo, streamId, xtreamData}:Props) => {
  try {
    axios.get(`http://${xtreamData.url}/player_api.php?username=${xtreamData.user_info.username}&password=${xtreamData.user_info.password}&action=get_short_epg&stream_id=${streamId}&&limit=2`)
      .then((res) => {
        setEpgInfo(res.data.epg_listings)
      })
  }
  catch {
    console.log('error')
    setEpgInfo([])
  }
  setTimeout(() => {
    getLiveEpg({setEpgInfo, streamId, xtreamData})
  }, 5 * 60000) // every 5 minutes
}

export default getLiveEpg