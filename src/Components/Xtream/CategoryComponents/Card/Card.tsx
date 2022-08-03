import { useState, useEffect } from 'react'
import CategoryDataTypes from './DataType'

type PropTypes = {
  liveData: CategoryDataTypes
  type: string
  marginWidth: number
}

const isValidUrl = (urlString: string | undefined) => {
  try {
    if (Boolean(new URL(urlString || ''))) {
      return urlString
    }
  }
  catch (e) {
    return false;
  }
}

export default function Card({ liveData, type, marginWidth }: PropTypes) {
  return (
    <div
      className={type !== 'live' ? 'card-wrapper not-live' : 'card-wrapper'}
      style={type !== 'live' && liveData.stream_icon ?
        { backgroundImage: `url(${liveData.stream_icon})`, margin: `10px ${marginWidth}px` }
        : { backgroundImage: `url(${liveData.cover})`, margin: `10px ${marginWidth}px` }}
    >
      {
        type === 'live' ? (
          <img
            loading="lazy"
            src={isValidUrl(liveData.stream_icon) || isValidUrl(liveData.cover) || 'https://i.imgur.com/4nqxosG.png'}
            alt={liveData.name} />
        ) : null
      }
      <h2>{liveData.name.replace(/[^a-zA-Z0-9 \[|\]]/g, '')}</h2>

    </div>
  )
}
