import React, { useContext, useState, useEffect } from 'react'
import { PlayListContext } from '../../../Contexts/PlayListContext'
import { getCategoriesDetails } from '../../Tools/getCategoriesDetails'
import LoadingComponent from '../../LoadingComponent'
import Card from './Card/Card'
import CategoryDataTypes from './Card/DataType'

type PropTypes = {
  category: string | number,
  type: string
}



export default function XtreamCategoryContent({ category, type }: PropTypes) {
  const { playlist } = useContext(PlayListContext as any)
  const [loadingComponent, setLoadingComponent] = useState(false)
  const [categoryData, setCategoryData] = useState([] as CategoryDataTypes[])
  const [searchInput, setSearchInput] = useState('' as string)


  useEffect(() => {
    setCategoryData([])
    setLoadingComponent(true)
    getCategoriesDetails(playlist.url, playlist.user_info.username, playlist.user_info.password, category, type)
      .then((data) => {
        setCategoryData(data)
        setLoadingComponent(false)
      }).catch((err) => {
        console.log(err)
      })
  }, [playlist, category])

  return (
    <div className="category-content-wrapper">
      {
        loadingComponent && <LoadingComponent type={'in-app-loading'} />
      }
      {!loadingComponent && !categoryData.length ? <div className="no-content" /> : null}
      <div className="search-container">
        <input type="text" placeholder='search...' onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <div className='card-listing'>
        {
          categoryData.map((item, index) => (
            <React.Fragment key={item.stream_id}>
              {item.name.toLowerCase().includes(searchInput.toLowerCase()) && (
                <Card
                  key={item.stream_id || index}
                  liveData={item}
                  type={type} />
              )
              }
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
