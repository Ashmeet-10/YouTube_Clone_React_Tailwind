import React from 'react'
import { useParams } from 'react-router-dom'
import { PlaylistCard, Loading } from '../'
import useChannelPlaylists from '../../hooks/channelHooks/useChannelPlaylists'

const Playlists = () => {
  const { id } = useParams()
  const { data, status, isError, isLoading } = useChannelPlaylists(id)

  if (isLoading) {
    return (<Loading classes="items-start" />)
  }

  if (isError) {
    return <span>Error</span>
  }

  let playlists = data.data
  let channelTitle = data.meta.title

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
