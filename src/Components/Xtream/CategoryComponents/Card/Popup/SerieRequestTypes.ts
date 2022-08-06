import CategoryDataTypes from "../DataType";
export default interface SerieRequestTypes {
  seasons: (Seasons)[],
  info: CategoryDataTypes,
  episodes: (Episodes)[],
}

interface Seasons {
  air_date: string,
  episode_count: number | string,
  id: number | string,
  name: string,
  overview: string,
  season_number: number | string,
  cover: string,
  cover_big: string
}

interface Episodes { //btw these are supposed to be the series' seasons themselves
  "1": (SeasonsInnerInterface)[],
  "2": (SeasonsInnerInterface)[],
  // etc..
}

export interface SeasonsInnerInterface {
  id: number | string,
  episode_num: number | string,
  title: string,
  container_extension: string,
  info: EpisodeInfo,
}

interface EpisodeInfo {
  tmdb_id: number | string,
  releasedate: string,
  plot: string,
  duration_secs: number | string,
  duration: string,
  movie_image: string,
  video: any,
  audio: any,
  bitrate: number | string,
  rating: number | string,
  season: number | string,
}