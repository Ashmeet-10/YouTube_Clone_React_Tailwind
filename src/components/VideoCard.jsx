import React from 'react'

const VideoCard = (props) => {
  return (
    <div className='text-white'>
      <div className="thumbnail relative w-full h-52">
        <img src={props.thumbnail[0].url} className="w-full h-52" alt="" />
        <span className='absolute bottom-1 right-1 bg-black text-white rounded-md text-xs font-semibold px-1 py-0.5'>{props.lengthText}</span>
      </div>
      <div className="flex items-center h-20 bg-[#0f0f0f]">
        <div className="channel-icon mx-2 flex justify-center items-center">
          <img src={props.channelThumbnail[0].url} width="50px" height="50px" className='rounded-full' alt="" />
        </div>
        <div className="info flex flex-col justify-center mr-2">
          <div className="video-description text-sm font-semibold">
            {props.title}
          </div>
          <div className="video-info flex items-center text-xs font-semibold opacity-60">
            <span>{props.channelTitle}</span>
            <div className="w-1 h-1 bg-white mx-1 rounded-full"></div>
            <span>{props.viewCount} views</span>
            <div className="w-1 h-1 bg-white mx-1 rounded-full"></div>
            <span>{props.publishedTimeText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
