import React from 'react'
import { useNavigate } from 'react-router-dom'

const VideoCard = (props) => {
  const navigate = useNavigate()
  const { channelVideo, videoId, thumbnail, lengthText, channelThumbnail, title, viewCount, publishedTimeText, channelTitle, relatedVideoId } = props
  const formatter = Intl.NumberFormat('en', {notation: 'compact'})
  return (
    <div
      className={`text-white cursor-pointer bg-[#0f0f0f] ${channelVideo ? 'flex xs:flex-col xs:m-0' : ''} ${relatedVideoId ? 'lg:px-4 lg:flex':''}`}
      onClick={() => navigate(`/video/${videoId}`)}
    >
      <div className={`thumbnail relative ${channelVideo ? 'w-1/2 mr-4 overflow-hidden xs:w-full' : 'w-full'} ${relatedVideoId?'lg:w-[45%] mr-2':''}`}>
        {thumbnail && <img src={typeof(relatedVideoId) === 'undefined'?(channelVideo?`${thumbnail[3].url}`:`${thumbnail[0].url}`):`${thumbnail[1].url}`} className={`w-full h-full xs:rounded-lg sm:rounded-xl ${relatedVideoId ? 'lg:rounded-2xl' : ''} ${channelVideo ? 'rounded-xl' : ''}`} alt="" />}
        <span className='absolute bottom-1 right-1 bg-black text-white rounded-md text-xs font-semibold px-1 py-0.5'>{lengthText}</span>
      </div>
      <div className={`flex h-24 bg-[#0f0f0f] ${relatedVideoId?'lg:w-1/2':''} ${channelVideo ? 'w-1/2 xs:w-full' : ''}`}>
        {!channelVideo && <div className={`channel-icon mx-2 flex justify-center items-center w-1/6 xs:justify-start xs:mx-0 ${relatedVideoId?'lg:hidden':''}`}>
          <img src={channelThumbnail?`${channelThumbnail[0].url}`:''} width="40px" height="40px" className='rounded-full' alt="" />
        </div>}
        <div className='info flex flex-col justify-center mr-2 w-5/6'>
          <div className="video-description text-sm font-semibold">
            <p className='line-clamp-2'>{title}</p>
          </div>
          <div className={`video-info flex text-xs font-semibold opacity-60 ${channelVideo ? 'flex-col' : 'items-center'}`}>
            <p className=''>
              {channelTitle? `${channelTitle}`:''}
              {channelTitle && <span className="w-1 h-1 bg-white mx-1 rounded-full inline-flex"></span>}
              {formatter.format(viewCount)} views
              {channelTitle && <span className="w-1 h-1 bg-white mx-1 rounded-full inline-flex"></span>}
              {!channelTitle && <p></p>}
              {publishedTimeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
