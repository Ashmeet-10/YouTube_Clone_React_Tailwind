import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import Loading from '../Loading'
import VideoCard from '../VideoCard'

const ChannelVideos = () => {
  const { id } = useParams()
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setIsLoading(()=>true)
      const data = await fetchFromAPI(`channel/videos?id=${id}`)
      setVideos(data.data)
      console.log(data)
      setIsLoading(()=>false)
    })()
  }, [id])

  if(isLoading){
    return (<Loading classes="items-start"/>)
  }

  return (
    <div className='mt-8 pb-8 px-4 space-y-4 bg-[#0f0f0f]'>
      {videos?.map((video, idx) => (
        <VideoCard key={idx} {...video} channelVideo='true' />
      ))}
    </div>
  )
}

export default ChannelVideos
