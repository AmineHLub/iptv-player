import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { PlayListContext } from '../../../Contexts/PlayListContext'
import { getCategoriesDetails } from '../../Tools/getCategoriesDetails'
import LoadingComponent from '../../LoadingComponent'
import Card from './Card/Card'
import CardPopup from './Card/CardPopup'
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
  const [popupStreamInfo, setPopupStreamInfo] = useState(null as null | CategoryDataTypes)
  const [scrollValue, setScrollValue] = useState(0 as number)


  useEffect(() => {
    if (document.querySelector('.category-content-wrapper')) {
      document.querySelector('.category-content-wrapper')!.scrollTop = scrollValue
    }
  } , [popupStreamInfo])

  useEffect(() => {
    setCategoryData([])
    setPopupStreamInfo(null)
    setLoadingComponent(true)
    getCategoriesDetails(playlist.url, playlist.user_info.username, playlist.user_info.password, category, type)
      .then((data) => {
        setCategoryData(data)
        setLoadingComponent(false)
      }).catch((err) => {
        console.log(err)
      })
  }, [playlist, category])

  const loadAllData = useMemo(() => (
    <>
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
                  setScrollValue={setScrollValue}
                  key={item.stream_id || index}
                  setPopupStreamInfo={setPopupStreamInfo}
                  liveData={item}
                  type={type} />
              )
              }
            </React.Fragment>
          ))
        }
      </div>
    </>
  ), [searchInput, category, categoryData])


  return (
    <div className={popupStreamInfo ? "category-content-wrapper hide-overflow" : "category-content-wrapper"}>
      {
        !popupStreamInfo ? loadAllData :
          <CardPopup
            popupStreamInfo={popupStreamInfo}
            setPopupStreamInfo={setPopupStreamInfo}
          />
      }
    </div>
  )
}
