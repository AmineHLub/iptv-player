export default interface CategoryDataTypes {
  name: string
  stream_id: string | number
  series_id: string | number
  stream_icon?: string
  cover?: string
  direct_source?: string
  plot: string,
  genre: string,
  releaseDate: string,
  rating: string,
  backdrop_path: (string)[],
  youtube_trailer: string,
  isNotForInfo?: boolean,
  num: number,
  stream_type: string,
  category_id: string | number,
}
