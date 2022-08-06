import axios from "axios";

export const getCategoriesDetails = async (url:string, username:string, password:string, category_id:string | number, type:string):Promise<any> => {
  let builtUrl;
  switch (type) {
    case "live":
      builtUrl = `http://${url}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${category_id}`;
      break;
    case "vod":
      builtUrl = `http://${url}/player_api.php?username=${username}&password=${password}&action=get_vod_streams&category_id=${category_id}`;
      break;
    case "series":
      builtUrl = `http://${url}/player_api.php?username=${username}&password=${password}&action=get_series&category_id=${category_id}`;
      break;
    default:
      builtUrl = `http://${url}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${category_id}`;
}
  try {
    console.log(builtUrl)
    const response = await axios(builtUrl);
    return response.data;
  } catch (error) {
    return [];
  }
}