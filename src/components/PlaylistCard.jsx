import React from 'react'
import { useNavigate } from 'react-router-dom'

const PlaylistCard = (props) => {
  const { thumbnail, videoCount, title, channelTitle, playlistId, search, subtitle, relatedVideoId, channelPlaylist } = props
  const navigate = useNavigate()
  return (
    <div className={`flex cursor-pointer text-white ${channelPlaylist?'xs:m-0 md:flex-col xl:space-y-4':''} ${relatedVideoId ? 'lg:w-[24vw]' : ''} ${search?'flex-col':''}`} onClick={() => navigate(`/playlist/${playlistId}`)}>
      <div className={`relative overflow-hidden ${channelPlaylist?'md:w-full':''} ${search?'':'w-[55%] rounded-lg'}`}>
        <img src={thumbnail ? (`${thumbnail[thumbnail.length-1].url}`) : ''} className={`xs:rounded-lg sm:rounded-xl ${relatedVideoId ? 'lg:rounded-2xl' : ''} ${search?'w-full':''}`} alt="" />
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-80 bg-black text-white xs:rounded-tr-lg xs:rounded-br-lg sm:rounded-tr-xl sm:rounded-br-xl">
        </div>
        <div className="flex flex-col justify-center items-center absolute right-0 top-0 w-1/3 h-full text-white text-sm space-y-1">
          <span className='font-semibold'>{videoCount}</span>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className={`flex flex-col ml-3 font-semibold ${channelPlaylist?'md:w-full lg:ml-0':''} ${!search?'w-[45%]':'my-4'}`}>
        <span className='text-sm line-clamp-3 xs:line-clamp-2 mr-4'>{title}</span>
        <span className='text-xs opacity-60 xs:line-clamp-1'>{channelTitle?channelTitle:subtitle}</span>
        <span className='text-xs opacity-60'>{videoCount} videos</span>
      </div>
    </div>
  )
}

export default PlaylistCard
