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
}
