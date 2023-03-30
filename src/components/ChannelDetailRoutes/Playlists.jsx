import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import Loading from '../Loading'
import PlaylistCard from '../PlaylistCard'

const Playlists = () => {
  const { id } = useParams()
  const [playlists, setPlaylists] = useState([])
  const [channelTitle, setChannelTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setIsLoading(()=>true)
      const data = await fetchFromAPI(`channel/playlists?id=${id}`)
      setPlaylists(data.data)
      setChannelTitle(data.meta.title)
      console.log(data)
      setIsLoading(()=>false)
    })()
  }, [id])

  if(isLoading){
    return (<Loading classes="items-start" />)
  }

  return (
    <div className='p-4 space-y-3'>
      {playlists?.map((playlist, idx1) => (
        <div key={idx1} className="">
          {playlist.type === "playlist" && <PlaylistCard {...playlist} channelTitle={channelTitle} />}

          {playlist.type === "playlist_listing" && <div>
            <span className='font-semibold'>{playlist.title}</span>
            <div className="my-8">
              {playlist?.data.map((actualPlaylist, idx2) => (
                <PlaylistCard {...actualPlaylist} key={idx2} channelTitle={channelTitle} />
              ))}
            </div>
          </div>}
        </div>
      ))}
    </div>
  )
}

export default Playlists
