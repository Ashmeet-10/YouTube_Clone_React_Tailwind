import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChannelCard = (props) => {
  const {thumbnail, title, subscriberCount, channelId} = props
  const navigate = useNavigate()
  console.log(props)
  return (
    <div className='bg-[#0f0f0f] text-white flex items-center pt-10 pb-8 cursor-pointer' onClick={()=>navigate(`/channel/${channelId}`)}>
      <div className="w-1/2 flex justify-center items-center">
        <img src={thumbnail[1].url} className="w-14 h-14 rounded-full" alt="" />
      </div>
      <div className="flex flex-col">
        <span className='text-sm font-semibold'>{title}</span>
        <span className='text-xs opacity-80'>{subscriberCount} subscribers</span>
        <button className='bg-white text-black rounded-full my-3 px-2 py-1 text-sm font-semibold'>Subscribe</button>
      </div>
    </div>
  )
}

export default ChannelCard
