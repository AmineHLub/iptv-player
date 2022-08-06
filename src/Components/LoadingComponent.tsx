import loadingGif from '../Assets/Spinner-1.2s-231px.gif'

export default function LoadingComponent({type}:{type?:string}) {
  return (
    <div className={type? `loading-component ${type}`: 'loading-component'}>
      <img src={loadingGif} alt='loading' />
    </div>
  )
}
