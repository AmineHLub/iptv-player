import { useState } from 'react'
import XtreamSideBar from './XtreamSideBar'
import XtreamCategoryContent from './XtreamCategoryContent'

type Stream = {
  streams: ({category_id:string | number,category_name:string,})[],
  type: string
}

type PropTypes = { 
  streamType: Stream,
  setStreamType: (streamType: null | Stream) => void
 }


export default function XtreamCategories({ streamType, setStreamType }:PropTypes){
  const [category, setCategory] = useState(streamType.streams[0].category_id as string | number)
  return (
    <main className="xtream-category-main">
      <XtreamSideBar streamType={streamType} setStreamType={setStreamType} category={category} setCategory={setCategory}/>
      <XtreamCategoryContent category={category}/>
    </main>
  )
}
