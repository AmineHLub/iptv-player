import { useState } from 'react'

type PropTypes = {
  streamType: ({ category_id: string | number, category_name: string })[],
  setStreamType: (streamType: null | ({ category_id: string | number, category_name: string })[]) => void,
  category: string | number,
  setCategory: (category: string | number) => void
}

export default function XtreamSideBar(
  { streamType, setStreamType, category, setCategory }: PropTypes) {
  return (
    <div className="sidebar-wraper">
      <div className="sidebar-controle">
        <button onClick={() => setStreamType(null)}>
          ←
        </button>
        <input type="text" placeholder='search...' />
      </div>
      <ul className='category-list'>
        {
          streamType?.map((categorylist) => (
            <li
              className={categorylist.category_id === category ? 'active' : undefined}
              key={categorylist.category_id}
              onClick={() => setCategory(categorylist.category_id)}>
              {categorylist.category_name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
