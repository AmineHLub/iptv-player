import { useState } from 'react'
import XtreamSideBar from './XtreamSideBar'
import XtreamCategoryContent from './XtreamCategoryContent'

export default function XtreamCategories({ streamType, setStreamType }: { streamType: ({category_id:string | number, category_name:string})[], setStreamType: (streamType: ({category_id:string | number, category_name:string})[]) => void }) {
  const [category, setCategory] = useState(streamType[0].category_id as string | number)
  return (
    <main className="xtream-category-main">
      <XtreamSideBar streamType={streamType} category={category} setCategory={setCategory}/>
      <XtreamCategoryContent category={category}/>
    </main>
  )
}
