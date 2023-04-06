import React from 'react'
import { useParams } from 'react-router-dom'
import { VideoCard, Loading } from '../'
import useChannelVideos from '../../hooks/channelHooks/useChannelVideos'

const ChannelVideos = () => {
  const { id } = useParams()
  const { data, status, isError, isLoading } = useChannelVideos(id)

  if (isLoading) {
    return (<Loading classes="items-start" />)
  }

  if (isError) {
    return <span>Error</span>
  }
  console.log(data)

  return (
    <div className='mt-8 pb-8 px-4 space-y-4 bg-[#0f0f0f]'>
      {data.data.map((video, idx) => (
        <VideoCard key={idx} {...video} channelVideo='true' />
      ))}
    </div>
  )
}

export default ChannelVideos
