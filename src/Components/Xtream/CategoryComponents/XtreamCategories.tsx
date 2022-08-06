import { useState } from 'react'
import XtreamSideBar from './XtreamSideBar'
import XtreamCategoryContent from './XtreamCategoryContent'

type Stream = {
  streams: ({category_id:string | number,category_name:string,})[],
  type: string
}

type PropTypes = { 
  streamTypeAndData: Stream,
  setStreamTypeAndData: (streamTypeAndData: null | Stream) => void
 }


export default function XtreamCategories({ streamTypeAndData, setStreamTypeAndData }:PropTypes){
  const [category, setCategory] = useState(streamTypeAndData.streams[0].category_id as string | number)
  return (
    <main className="xtream-category-main">
      <XtreamSideBar streamTypeAndData={streamTypeAndData} setStreamTypeAndData={setStreamTypeAndData} category={category} setCategory={setCategory}/>
      <XtreamCategoryContent category={category} type={streamTypeAndData.type}/>
    </main>
  )
}
