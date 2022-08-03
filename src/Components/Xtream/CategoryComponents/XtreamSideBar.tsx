import React, { useState } from 'react'

type Stream = {
  streams: ({category_id:string | number,category_name:string,})[],
  type: string
}

type PropTypes = {
  streamType: Stream,
  setStreamType: (streamType: null | Stream) => void,
  category: string | number,
  setCategory: (category: string | number) => void
}

export default function XtreamSideBar(
  { streamType, setStreamType, category, setCategory }: PropTypes) {
  const [searchInput, setSearchInput] = useState('' as string)
  return (
    <div className="sidebar-wraper">
      <div className="sidebar-controle">
        <button onClick={() => setStreamType(null)}>
          ←
        </button>
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder='search...' />
      </div>
      <ul className='category-list'>
        {
          streamType.streams?.map((categorylist, index) => (
            <React.Fragment key={categorylist.category_id || index}>
            {
              categorylist.category_name.toLowerCase().includes(searchInput.toLowerCase()) && (
                <li
                  key={categorylist.category_id || index}
                  className={categorylist.category_id === category ? 'active' : undefined}
                  onClick={() => setCategory(categorylist.category_id)}>
                  {categorylist.category_name}
                </li>
              )
            }
            </React.Fragment>
          ))
        }
      </ul>
    </div>
  )
}
