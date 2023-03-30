import React from 'react'
import { useNavigate } from 'react-router-dom'

const VideoCard = (props) => {
  const navigate = useNavigate()
  const { channelVideo, videoId, thumbnail, lengthText, channelThumbnail, title, viewCount, publishedTimeText, channelTitle } = props
  const formatter = Intl.NumberFormat('en', {notation: 'compact'})
  return (
    <div
      className={`text-white cursor-pointer bg-[#0f0f0f] ${channelVideo ? 'flex' : ''}`}
      onClick={() => navigate(`/video/${videoId}`)}
    >
      <div className={`thumbnail relative ${channelVideo ? 'w-1/2 h-24 mr-4 overflow-hidden' : 'w-full h-52'}`}>
        <img src={thumbnail?`${thumbnail[0].url}`:''} className={`w-full h-full ${channelVideo ? 'rounded-xl' : ''}`} alt="" />
        <span className='absolute bottom-1 right-1 bg-black text-white rounded-md text-xs font-semibold px-1 py-0.5'>{lengthText}</span>
      </div>
      <div className={`flex h-24 bg-[#0f0f0f] ${channelVideo ? 'w-1/2' : ''}`}>
        {!channelVideo && <div className="channel-icon mx-2 flex justify-center items-center w-1/6">
          <img src={channelThumbnail?`${channelThumbnail[0].url}`:''} width="40px" height="40px" className='rounded-full' alt="" />
        </div>}
        <div className='info flex flex-col justify-center mr-2 w-5/6'>
          <div className="video-description text-sm font-semibold">
            <p className='line-clamp-2'>{title}</p>
          </div>
          <div className={`video-info flex text-xs font-semibold opacity-60 ${channelVideo ? 'flex-col' : 'items-center'}`}>
            <p className=''>
              {channelTitle? `${channelTitle}`:''}
              {channelTitle && <div className="w-1 h-1 bg-white mx-1 rounded-full inline-flex"></div>}
              {formatter.format(viewCount)} views
              {channelTitle && <div className="w-1 h-1 bg-white mx-1 rounded-full inline-flex"></div>}
              {!channelTitle && <div></div>}
              {publishedTimeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
