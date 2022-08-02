import React from 'react'

export default function XtreamCategoryContent({category}: {category: string | number}) {
  return (
    <div className="category-content-wrapper">
      {category}
    </div>
    )
}
