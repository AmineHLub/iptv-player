import { useContext, useState, useEffect } from 'react'
import { PlayListContext } from '../../../Contexts/PlayListContext'
import { getLiveCategoriesDetails } from '../../Tools/getCategoriesDetails'
import LoadingComponent from '../../LoadingComponent'
import Card from './Card/Card'
import CategoryDataTypes from './Card/DataType'

type PropTypes = {
  category: string | number
}


export default function XtreamCategoryContent({ category }: PropTypes) {
  const { playlist } = useContext(PlayListContext as any)
  const [loadingComponent, setLoadingComponent] = useState(false)
  const [categoryData, setCategoryData] = useState([] as CategoryDataTypes[])

  useEffect(() => {
    setCategoryData([])
    setLoadingComponent(true)
    getLiveCategoriesDetails(playlist.url, playlist.user_info.username, playlist.user_info.password, category)
      .then((data) => {
        setCategoryData(data)
        setLoadingComponent(false)
      }).catch((err) => {
        console.log(err)
      })
  }, [playlist, category])
  console.log(loadingComponent)

  return (
    <div className="category-content-wrapper">
      {
        loadingComponent && <LoadingComponent type={'in-app-loading'} />
      }
      {!loadingComponent && !categoryData.length ? <div className="no-content" /> : null}
      {
        categoryData.map((item, index) => (
          <Card key={item.stream_id || index} liveData={item} />
        ))
      }
    </div>
  )
}
