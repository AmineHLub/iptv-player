import axios from "axios";

export const getLiveCategoriesDetails = async (url:string, username:string, password:string, category_id:string | number):Promise<any> => {
  const builtUrl = `http://${url}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${category_id}`;
  try {
    console.log(builtUrl)
    const response = await axios(builtUrl);
    return response.data;
  } catch (error) {
    return [];
  }
}