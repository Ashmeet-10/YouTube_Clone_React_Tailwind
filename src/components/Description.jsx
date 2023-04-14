import React from 'react'
import { useNavigate } from 'react-router-dom'
import useChannelAbout from '../hooks/channelHooks/useChannelAbout'
import { Loading } from './'

const Description = (props) => {
  const navigate = useNavigate()
  const { id, setHideDescription, videoInfo, shorts, descRef } = props
  const { data:channelDetails, status, isError, isLoading } = useChannelAbout(id)

  if(isLoading){
    return <Loading classes="items-start" />
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <div className={`description pb-2 relative px-4 bg-[#0f0f0f] text-white ${shorts ? 'h-[60vh] overflow-y-auto' : ''}`}>
      <div className="flex justify-between items-center py-4 border-gray-600 border-b-[1px]">
        <span className='text-xl font-bold blur-[0.5px] shadow-white drop-shadow-lg text-white'>Description</span>
        <button
          onClick={() => {
            if (shorts) {
              descRef.current.classList.remove('translate-y-[40vh]')
              descRef.current.classList.add('translate-y-[100vh]')
            }
            else {
              setHideDescription(true)
            }
          }}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>

      <div className="">
        <div className="my-4 text-lg font-bold">
          <p className='blur-[0.5px]'>{videoInfo.title}</p>
        </div>
        <div
          className="flex items-center space-x-3 mb-6 cursor-pointer"
          onClick={() => navigate(`/channel/${channelDetails?.channelId}`)}
        >
          <img src={channelDetails.avatar ? `${channelDetails.avatar[1].url}` : ''} className="w-6 h-6 rounded-full" alt="Icon" />
          <span className="text-sm font-bold opacity-80">{channelDetails.title}</span>
        </div>
        <div className="flex justify-evenly pb-3 font-bold blur-[0.5px] text-xl border-gray-600 border-b-[1px]">
          <p className="whitespace-nowrap">{Number(videoInfo.viewCount).toLocaleString()} views</p>
          <p className="whitespace-nowrap">{videoInfo.uploadDate}</p>
        </div>
      </div>

      <p className="whitespace-pre-wrap mt-6 pb-10 leading-4 opacity-90 font-semibold font-sans text-sm border-gray-700 border-b-[6px] max-w-[100vw] overflow-hidden">{videoInfo.description}</p>

      <div className="">
        <div className="flex items-center space-x-3 my-4">
          <div className="">
            <img src={channelDetails.avatar ? `${channelDetails.avatar[1].url}` : ''} className="w-16 h-16 rounded-full" alt="Icon" />
          </div>
          <div className="flex flex-col font-semibold opacity-90">
            <span className="text-lg">{channelDetails.title}</span>
            <span className="text-sm">{channelDetails.subscriberCountText} subscribers</span>
          </div>
        </div>
        <div className="flex justify-evenly py-2">
          <button
            onClick={() => navigate(`/channel/${channelDetails?.channelId}/videos`)}
            className='rounded-full border border-white px-6 py-1 hover:bg-[#383838] hover:border-[#383838]'
          >
            <i className="fa-regular fa-circle-play rounded-full"></i> Videos
          </button>

          <button
            onClick={() => navigate(`/channel/${channelDetails?.channelId}/about`)}
            className='rounded-full border border-white px-6 py-1 hover:bg-[#383838] hover:border-[#383838]'
          >
            <i className="fa-regular fa-id-badge rounded-full"></i> About
          </button>
        </div>
      </div>
    </div>
  )
}

export default Description
