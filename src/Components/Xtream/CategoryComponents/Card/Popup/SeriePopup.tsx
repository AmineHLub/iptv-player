import { useLayoutEffect, useState, useContext, useRef, MutableRefObject } from 'react'
import { PlayListContext } from '../../../../../Contexts/PlayListContext'
import LoadingComponent from '../../../../LoadingComponent'
import axios from 'axios'
import SerieRequestTypes from './SerieRequestTypes'
import { SeasonsInnerInterface } from './SerieRequestTypes'
import toMinuteConverter from '../../../../Tools/toMinuteConverter'
import Player from '../../../../../Player/Player'

export default function SeriePopup({ id }: { id: string | number }) {
  const { playlist } = useContext(PlayListContext as any)
  const [data, setData] = useState(null as null | SerieRequestTypes)
  const [loading, setLoading] = useState(true)
  const [currentSeason, setCurrentSeason] = useState(0)
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [prevScrollValue, setPrevScrollValue] = useState(0)
  const [slidingBreakPoints, setSlidingBreakPoints] = useState(null as any | (number)[])
  const [mountedPlayer, setMountedPlayer] = useState(null as any)
  const seasonList = useRef() as MutableRefObject<HTMLInputElement>;

  const fetchSerieInfo = async () => {
    const url =
      `http://${playlist.url}/player_api.php?
          username=${playlist.user_info.username}&
          password=${playlist.user_info.password}&action=get_series_info&
          series_id=${id}`
    try {
      const response = await axios.get(url)
      return response.data
    } catch {
      return []
    }
  }

  useLayoutEffect(() => {
    fetchSerieInfo().then((data) => {
      setData(data)
    }).then(() => {
      if (seasonList?.current && seasonList.current.children[0]) {
        const breakpoint = [0]
        for (let i = 0; i < seasonList.current.children.length; i++) {
          const ninetyPercent = seasonList.current.children[i].scrollHeight * 9 / 10 // when we reach 90% of the height of the season
          breakpoint.push(ninetyPercent + breakpoint[breakpoint.length - 1])
        }
        setSlidingBreakPoints(breakpoint)
      }
      setLoading(false)
    })

  }, [])

  const onScroll = () => {
    if (seasonList.current.scrollTop > prevScrollValue) { // sliding down
      if (seasonList.current.scrollTop > slidingBreakPoints[currentSeason + 1]) {
        setCurrentSeason(currentSeason + 1)
      }
    }
    else { // sliding up
      if (seasonList.current.scrollTop < slidingBreakPoints[currentSeason]) {
        setCurrentSeason(currentSeason - 1)
      }
    }
    setPrevScrollValue(seasonList.current.scrollTop)
  };


  return (
    <div className='series-popup-container'>
      {loading ? <LoadingComponent /> : (
        <>
          <div className='trailer-container'>
            <div className='trailer-position-container'>
              <p className='genre'>{data?.info.genre}{' '}{data?.info.releaseDate && new Date(data.info.releaseDate).getFullYear() || 'N/A'}{` | ${data?.episodes && Object.keys(data.episodes).length || 'N/A'} Seasons`}</p>
              <h2 className='title'>{data?.info.name}</h2>
              <a
                href={`https://www.youtube.com/watch?v=${data?.info.youtube_trailer && data.info.youtube_trailer}`}
                className={data?.info.youtube_trailer ? '' : 'disabled'}
                target="_blank"
              >Watch Trailer
              </a>
            </div>
          </div>
          <div className='season-cover-container' style={{ backgroundImage: 'url(https://i.imgur.com/4nqxosG.png)' }}>
            <img
              src={data?.seasons[currentSeason]?.cover || data?.info.cover}
              alt={`${data?.info.name} season ${currentSeason}`}
            />
          </div>
          <div className='series-info-selector-container'>
            <div className='seasons-container-selector'
              onScroll={() => onScroll()}
              ref={seasonList}>
              {
                data?.episodes && Object.keys(data.episodes).length && (
                  Object.keys(data.episodes).map((season, i) => (
                    <section key={season} id={`season-${season}`}>
                      <h2>Season {season}</h2>
                      {
                        (data.episodes[`${i + 1}`] as any).map((episode: SeasonsInnerInterface, num: number) => (
                          <div key={episode.id} id={episode.id.toString()}
                            onClick={() => setMountedPlayer({
                              type: 'serie',
                              selectedStreamId : episode,
                              xtreamData: playlist,
                              playlist: data.episodes[`${i + 1}`] as any})}
                            className={currentEpisode === episode.id ? 'episode-container-card active-ep-card' : 'episode-container-card'}
                          >
                            <img src={episode.info.movie_image || data.info.cover || data.info.stream_icon || 'https://i.imgur.com/4nqxosG.png'} alt='episode' />
                            <div className='episode-info-container'>
                              <div className="name-duration">
                                <h3>{num + 1}{' . '}{episode.title.slice(0, 30)}</h3>
                                <p>{toMinuteConverter(episode.info.duration)}{' mins'}</p>
                              </div>
                              <div className='episode-info-breaker' />
                              <div className="rating-release-container">
                                <div className="episode-rating">
                                  <p>{episode.info.rating !== 0 && episode.info.rating || 'N/A'}</p>
                                  <img src='https://i.imgur.com/D4C97LY.png' alt='rating-ico' />
                                </div>
                                <p>{episode.info.releasedate || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </section>
                  )))
              }
            </div>
            <ul className='seasons-selector'>
              {
                data?.episodes && Object.keys(data.episodes).length && (
                  Object.keys(data.episodes).map((season, i) => (
                    <li
                      className={currentSeason === i ? 'active-season' : ''}
                      onClick={() => { seasonList.current.children[i].scrollIntoView(); setCurrentSeason(i) }}
                    >{i + 1}</li>
                  )))
              }
            </ul>
          </div>
        </>
      )}
      {mountedPlayer && <Player notLive={mountedPlayer} partOfApp={() => setMountedPlayer(null)}/>}
    </div>
  )
}
