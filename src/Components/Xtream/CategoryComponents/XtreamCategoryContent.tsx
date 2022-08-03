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
  const [widthSize, setWidthSize] = useState(0)
  
  function handleWindowResize() {
    setWidthSize(document.querySelector('.card-listing')?.clientWidth || 0)
  }


  useEffect(() => {
    setCategoryData([])
    setLoadingComponent(true)
    handleWindowResize()
    getCategoriesDetails(playlist.url, playlist.user_info.username, playlist.user_info.password, category, type)
      .then((data) => {
        setCategoryData(data)
        setLoadingComponent(false)
      }).catch((err) => {
        console.log(err)
      })
  }, [playlist, category])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [playlist, category, loadingComponent])


  const marginWidth:number = Math.floor(Math.floor(widthSize % 170) / 2 / Math.floor(widthSize / 170))


  console.log(searchInput)
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
                  marginWidth={marginWidth}
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
