interface CategoryDataTypes {
  stream_id: string | number
}

type PropTypes = {
  liveData: CategoryDataTypes
}

export default function Card({ liveData }: PropTypes) {
  return (
    <div className='card-wrapper'>

    </div>
  )
}
