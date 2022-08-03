import CategoryDataTypes from './DataType'

type PropTypes = {
  liveData: CategoryDataTypes
}

export default function Card({ liveData }: PropTypes) {
  return (
    <div className='card-wrapper'>
      <img src={liveData.stream_icon || 'https://i.imgur.com/4nqxosG.png'} alt={liveData.name} />
      <h2>{liveData.name.replace(/[^a-zA-Z0-9 \[|\]]/g, '')}</h2>
    </div>
  )
}
