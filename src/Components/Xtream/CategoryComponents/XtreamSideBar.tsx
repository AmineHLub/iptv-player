import React from 'react'

export default function XtreamSideBar(
  { streamType, category, setCategory }:
    { streamType: ({ category_id: string | number, category_name: string })[], category: string | number, setCategory: (category: string | number) => void }) {
  return (
    <div className="sidebar-wraper">
      <ul className='category-list'>
        {
          streamType.map((categorylist) => (
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
