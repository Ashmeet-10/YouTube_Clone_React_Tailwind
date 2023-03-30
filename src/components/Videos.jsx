import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import ChannelCard from './ChannelCard'
import { Loading, PlaylistCard, VideoCard } from './'

const Videos = (props) => {
  const { videos, setVideos, selectedSuggCat, Category, selectedCategory } = props
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let url = Category ? `related?id=${Category}` : `search?query=${selectedSuggCat}`
    if (selectedSuggCat === 'Trending') {
      url = 'trending?geo=IN&type=now'
    }
    setIsLoading(() => true)
    fetchFromAPI(url)
      .then((response) => {
        setVideos(response.data)
        console.log(response)
        setIsLoading(() => false)
      })
  }, [selectedSuggCat, Category])

  if (isLoading) {
    return (<Loading classes="items-center h-[70vh]" />)
  }

  return (
    <div className='flex flex-col'>
      {videos?.map((video, idx) => (
        <div key={idx}>
          {video.type === 'video' && <VideoCard {...video} />}
          {video.type === 'channel' && <ChannelCard {...video} />}
          {video.type === 'playlist' && <PlaylistCard {...video} search="true" />}
        </div>
      ))}
    </div>
  )
}

export default Videos
