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
    <div className='p-2 xs:grid md:gap-2 lg:gap-4 xs:grid-cols-2 min-[860px]:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5'>
      {playlists?.map((playlist, idx1) => (
        <div key={idx1} className="">
          {playlist.type === "playlist" && <div className="mx-1 my-6">
            <PlaylistCard {...playlist} channelTitle={channelTitle} channelPlaylist={true} />
          </div>}

          {playlist.type === "playlist_listing" && <div>
            <span className='font-semibold'>{playlist.title}</span>
            <div className="my-8">
              {playlist?.data.map((actualPlaylist, idx2) => (
                <PlaylistCard {...actualPlaylist} key={idx2} channelTitle={channelTitle} channelPlaylist={true} />
              ))}
            </div>
          </div>}
        </div>
      ))}
    </div>
  )
}

export default Playlists
