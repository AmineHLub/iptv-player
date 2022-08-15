export type Props = {
  live?: LiveProps,
  notLive?: notLiveProps,
  partOfApp? : Function | undefined,
}

export type LiveProps = {
    selectedStreamId: livextreamPlaylist
    playlist?: (livextreamPlaylist)[]
    xtreamData: xtreamData
    hlsConfig?: {}
}

export type notLiveProps = {
    type: string,
    selectedStreamId: livextreamPlaylist
    playlist?: (livextreamPlaylist)[]
    xtreamData: xtreamData
}


// inner component

export type xtreamData = {
    user_info: {
      username: string,
      password: string,
      exp_date?: string,
  },
    url: string,
}

export type livextreamPlaylist = {
  id: number | string,
  title: string,
  name?: string
  stream_id?: string | number
  series_id?: string | number
  stream_icon?: string
  cover?: string
  direct_source?: string
  plot?: string,
  genre?: string,
  releaseDate?: string,
  rating?: string,
  backdrop_path?: (string)[],
  youtube_trailer?: string,
  isNotForInfo?: boolean,
  num?: number,
  stream_type?: string,
  category_id?: string | number,
  container_extension?: string,
  info?: EpisodeInfo,
}

type EpisodeInfo = {
duration: string
duration_secs: number | string
movie_image: string
cover: string
stream_icon: string
}