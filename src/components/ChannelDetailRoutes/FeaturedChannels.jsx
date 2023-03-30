import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import Loading from '../Loading'

const FeaturedChannelsCard = (props) => {
  const navigate = useNavigate()
  const { thumbnail, title, subscriberCount, videoCount, channelId } = props
  return (
    <div className="flex items-center cursor-pointer mb-6" onClick={() => navigate(`/channel/${channelId}`)}>
      <div className="w-1/2 flex justify-center items-center">
        <img src={thumbnail ? `https:${thumbnail[2].url}` : ''} alt="" className='w-20 h-20 rounded-full overflow-hidden' />
      </div>
      <div className="w-1/2 flex flex-col">
        <span className='text-sm font-semibold'>{title}</span>
        <span className='text-xs font-semibold opacity-70'>{subscriberCount} subscribers</span>
        <span className='text-xs font-semibold opacity-70'>{videoCount} videos</span>
        <span className='text-red-500 font-bold'>SUBSCRIBE</span>
      </div>
    </div>
  )
}

const FeaturedChannels = () => {
  const { id } = useParams()
  const [channels, setChannels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setIsLoading(() => true)
      const data = await fetchFromAPI(`channel/channels?id=${id}`)
      setChannels(data.data)
      console.log(data)
      setIsLoading(() => false)
    })()
  }, [])

  if (isLoading) {
    return (<Loading classes="items-start"/>)
  }

  return (
    <div className='p-4 mt-4'>
      {channels?.map((channel, idx1) => (
        <div key={idx1} className="">
          {channel.type === "channel" && <FeaturedChannelsCard {...channel} />}

          {channel.type === "channel_listing" && channel.title === "Subscriptions" &&
            <div className='my-4 border-white border-b-[1px]'>
              <span className='font-semibold'>{channel.title}</span>
              <div className="my-4">
                {channel?.data.map((actualChannel, idx2) => (
                  <FeaturedChannelsCard key={idx2} {...actualChannel} />
                ))}
              </div>
            </div>}

          {channel.type === "channel_listing" && channel.title === "Featured Channels" &&
            <div className='border-white border-b-[1px]'>
              <span className='font-semibold'>{channel.title}</span>
              <div className="my-4">
                {channel?.data.map((actualChannel, idx2) => (
                  <FeaturedChannelsCard key={idx2} {...actualChannel} />
                ))}
              </div>
            </div>}
        </div>
      ))}
    </div>
  )
}

export default FeaturedChannels
