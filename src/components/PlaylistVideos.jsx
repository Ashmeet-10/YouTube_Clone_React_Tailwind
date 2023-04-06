import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { VideoCard, Loading } from './'
import usePlaylistInfo from '../hooks/usePlaylistInfo'

const PlaylistVideos = () => {
  const { id } = useParams()
  const { data:playlistsInfo, status, isError, isLoading } = usePlaylistInfo(id)
  const [playlistDesc, setPlaylistDesc] = useState('line-clamp-2')

  if (isLoading) {
    return (<Loading classes="h-[100vh] items-center" />)
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <div className='bg-[#0f0f0f] text-white space-y-4 px-4 pb-4'>
      {playlistsInfo.meta && <div className="relative flex flex-col pt-8 mb-6">
        <img src={`${playlistsInfo.data[0].thumbnail[3].url}`} className="absolute h-full blur-2xl shadow-sm bg-cover z-0" alt="" />
        <img src={`${playlistsInfo.data[0].thumbnail[3].url}`} className="w-4/5 mx-auto rounded-xl z-10 shadow-lg" alt="" />
        {<div className="z-10">
          <h1 className='text-3xl font-bold my-4'>{playlistsInfo.meta.title}</h1>
          <p className='text-sm font-semibold'>{playlistsInfo.meta.channelTitle}</p>
          <span className='text-xs font-semibold opacity-80'>{playlistsInfo.meta.videoCountText} {playlistsInfo.meta.lastUpdated}</span>
          <p
            className={`text-xs font-bold mt-4 ${playlistDesc} cursor-pointer`}
            onClick={()=>{
              playlistDesc==='line-clamp-2' ? setPlaylistDesc('line-clamp-none') : setPlaylistDesc('line-clamp-2')
            }}
          >
            {playlistsInfo.meta.description}
          </p>
        </div>}
      </div>}
      <div className="space-y-4">
        {playlistsInfo.data && playlistsInfo.data.map((video, idx) => (
          <VideoCard key={idx} {...video} channelVideo='true' />
        ))}
      </div>
    </div>
  )
}

export default PlaylistVideos
