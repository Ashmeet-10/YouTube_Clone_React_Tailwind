import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import Youtube_icon from '../assets/Youtube_icon.svg'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { channelTabs } from '../utils/constants'
import Loading from './Loading'

const ChannelDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [channelDetails, setChannelDetails] = useState({})
  const [channelTab, setChannelTab] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setIsLoading(()=>true)
      const data = await fetchFromAPI(`channel/about?id=${id}`)
      setChannelDetails(data)
      console.log(data)
      setIsLoading(()=>false)
    })()
  }, [id])

  if(isLoading){
    return <Loading classes="h-[100vh] items-center" />
  }

  return (
    <div className='bg-[#0f0f0f] text-white'>
      <div className="flex justify-between items-center px-3 py-2">
        <div className="flex items-center">
          <img src={Youtube_icon} width="35px" height="35px" alt="" className='inline mr-3 cursor-pointer' onClick={()=>navigate(`/`)} />
          <span className='font-semibold line-clamp-1 mx-2'>{channelDetails.title}</span>
        </div>
        <div className="search mr-4">
          <button type='button'>
            <i className="fa-solid fa-magnifying-glass opacity-80"></i>
          </button>
        </div>
      </div>
      <div className="banner">
        <img src={channelDetails.banner ? `${channelDetails.banner[0].url}` : ''} alt="" />
      </div>
      <div className="bg-[#212121] px-3 pt-3 flex flex-col items-center">
        <img src={channelDetails.avatar ? `${channelDetails.avatar[1].url}` : ''} className="w-14 h-14 rounded-full" alt="Icon" />
        <span className='text-2xl mt-2 font-extrabold text-center'>{channelDetails.title}</span>
        <div className="flex my-2 text-xs opacity-70">
          <span>{channelDetails.channelHandle}</span>
          <span className='mx-3'>{channelDetails.subscriberCountText} Subscribers</span>
          <span>{channelDetails.videosCountText} Videos</span>
        </div>
        <div className="flex cursor-pointer" onClick={()=>navigate(`/channel/${id}/about`)}>
          <p className='text-xs opacity-70 text-center line-clamp-2'>{channelDetails.description}</p>
          <button className='ml-3 text-xl opacity-60'><i className="fa-solid fa-angle-right"></i></button>
        </div>
        <button className='bg-white w-full mt-4 text-black text-sm font-semibold py-2 rounded-3xl hover:bg-gray-200'>Subscribe</button>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none] bg-[#212121]">
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
      <Outlet />
    </div>
  )
}

export default ChannelDetail
