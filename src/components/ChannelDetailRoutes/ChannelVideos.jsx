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
    <div className='mt-8 pb-8 px-4 bg-[#0f0f0f] xs:grid xs:grid-cols-2 min-[860px]:grid-cols-3 lg:grid-cols-4 lg:gap-2 3xl:grid-cols-5'>
      {data.data.map((video, idx) => (
        <div key={idx} className="my-6 mx-2">
          <VideoCard {...video} channelVideo='true' />
        </div>
      ))}
    </div>
  )
}

export default ChannelVideos
