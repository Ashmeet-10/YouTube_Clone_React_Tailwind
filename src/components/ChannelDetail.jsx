import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { channelTabs } from '../utils/constants'
import { Loading } from './'
import useChannelAbout from '../hooks/channelHooks/useChannelAbout'

const ChannelDetail = ({ updateId }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  updateId(id)
  const { data:channelDetails, status, isError, isLoading } = useChannelAbout(id)
  const [channelTab, setChannelTab] = useState('home')
  const channelRegex = new RegExp('/channel/')
  const VideosRegex = new RegExp('/videos')
  const shortsRegex = new RegExp('/shorts')
  const playlistsRegex = new RegExp('/playlists')
  const communityRegex = new RegExp('/community')
  const channelsRegex = new RegExp('/channels')
  const aboutRegex = new RegExp('/about')

  useEffect(() => {
    if (channelRegex.test(location.pathname)) {
      if (VideosRegex.test(location.pathname)) {
        setChannelTab('videos')
      }
      else if (shortsRegex.test(location.pathname)) {
        setChannelTab('shorts')
      }
      else if (playlistsRegex.test(location.pathname)) {
        setChannelTab('playlists')
      }
      else if (communityRegex.test(location.pathname)) {
        setChannelTab('community')
      }
      else if (channelsRegex.test(location.pathname)) {
        setChannelTab('channels')
      }
      else if (aboutRegex.test(location.pathname)) {
        setChannelTab('about')
      }
      else{
        setChannelTab('home')
      }
    }
  }, [location.pathname])


  if (isLoading) {
    return <Loading classes="h-[100vh] items-center" />
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <div className='bg-[#0f0f0f] text-white'>
      <div className="banner">
        <img src={channelDetails.banner ? `${channelDetails.banner[2].url}` : ''} className='w-full' alt="" />
      </div>
      <div className="bg-[#212121] max-w-screen-4xl mx-auto px-3 pt-3 flex flex-col items-center lg:bg-[#0f0f0f]">
        <img src={channelDetails.avatar ? `${channelDetails.avatar[channelDetails.avatar.length - 1].url}` : ''} className="w-14 h-14 rounded-full lg:w-28 lg:h-28" alt="Icon" />
        <span className='text-2xl mt-2 font-extrabold text-center'>{channelDetails.title}</span>
        <div className="flex my-2 text-xs opacity-70 lg:text-sm">
          <span>{channelDetails.channelHandle}</span>
          <span className='mx-3'>{channelDetails.subscriberCountText} Subscribers</span>
          <span>{channelDetails.videosCountText} Videos</span>
        </div>
        <div className="flex cursor-pointer"
          onClick={() => {
            navigate(`/channel/${id}/about`)
            setChannelTab('about')
          }}
        >
          <p className='text-xs opacity-70 text-center line-clamp-2 lg:text-sm'>{channelDetails.description}</p>
          <button className='ml-3 text-xl opacity-60'><i className="fa-solid fa-angle-right"></i></button>
        </div>
        <button className='bg-white w-32 mt-4 text-black text-sm font-semibold py-2 rounded-3xl hover:bg-gray-200'>Subscribe</button>
      </div>

      <div className="overflow-x-auto max-w-screen-4xl mx-auto lg:sticky lg:top-16 lg:left-0 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none] bg-[#212121] lg:bg-[#0f0f0f] border-b border-gray-600 ">
        <div className="py-4">
          {channelTabs.map((tab) => (
            <Link
              to={tab.value === 'home' ? `/channel/${id}` : `/channel/${id}/${tab.value}`}
              key={tab.key}
            >
              <span
                className={`px-8 py-4 cursor-pointer ${tab.value === channelTab ? 'border-white border-b-2' : ''}`}
                onClick={() => setChannelTab(tab.value)}
              >
                {tab.value.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-screen-4xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default ChannelDetail
