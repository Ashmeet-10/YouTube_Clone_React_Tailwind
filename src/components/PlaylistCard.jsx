import React from 'react'
import { useNavigate } from 'react-router-dom'

const PlaylistCard = (props) => {
  const { thumbnail, videoCount, title, channelTitle, playlistId, search, subtitle } = props
  const navigate = useNavigate()
  return (
    <div className={`flex cursor-pointer text-white ${search?'flex-col':'my-4'}`} onClick={() => navigate(`/playlist/${playlistId}`)}>
      <div className={`relative overflow-hidden ${search?'w-[100vw]':'w-[55%] rounded-lg'}`}>
        <img src={thumbnail ? (search?`${thumbnail[3].url}`:`${thumbnail[0].url}`) : ''} className={`${search?'w-screen':''}`} alt="" />
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-80 bg-black text-white">
        </div>
        <div className="flex flex-col justify-center items-center absolute right-0 top-0 w-1/3 h-full text-white text-sm space-y-1">
          <span className='font-semibold'>{videoCount}</span>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className={`flex flex-col ml-3 font-semibold ${!search?'w-[45%]':'my-4'}`}>
        <span className='text-sm line-clamp-3'>{title}</span>
        <span className='text-xs opacity-60'>{channelTitle?channelTitle:subtitle}</span>
        <span className='text-xs opacity-60'>{videoCount} videos</span>
      </div>
    </div>
  )
}

export default PlaylistCard
