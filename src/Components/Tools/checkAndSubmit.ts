import axios from 'axios'
import { toast } from 'react-toastify'

type Data = {
  host:string,port:string,username:string,password:string
 }
const checkAndSubmit = async (data:Data) => {
  let url:string = ''
  if (data.host.includes('https')) {
    url = `https://${data.host}:${data.port}/player_api.php?username=${data.username}&password=${data.password}`
  } else {
    url = `http://${data.host}:${data.port}/player_api.php?username=${data.username}&password=${data.password}`
  }
  let fetchedData = {
    validity: false,
    data: {}
  }
  const loginPromise:Promise<{validity:boolean, data:object}> = new Promise(function (resolve, reject) {
    axios.get(url).then(res => {
      if (res.data.user_info?.status?.toLowerCase() === 'active') {
        fetchedData = {
          validity: true,
          data: {...res.data, url: `${data.host}:${data.port}`}
        }
        resolve(fetchedData)
      } else {
        reject(fetchedData)
      }
    }).catch(err => {
      reject(fetchedData)
      toast.dismiss()
      toast.error('Invalid Host:Port')
    })
  })
  toast.promise(loginPromise, {
    pending: 'Logging you in...',
    success: 'Logged in successfully',
    error: 'Login failed'
  })
  return loginPromise;
}

export default checkAndSubmit;