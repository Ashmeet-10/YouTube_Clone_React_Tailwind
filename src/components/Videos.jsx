import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from './VideoCard'

const Videos = (props) => {
  const { videos, setVideos, selectedSuggCat } = props
  
  useEffect(()=>{
    let url = `search?query=${selectedSuggCat}`
    if (selectedSuggCat === 'Trending'){
      url='trending?geo=IN&type=now'
    }
    fetchFromAPI(url)
      .then((response) => {
        setVideos(response.data)
        console.log(videos)})
  },[selectedSuggCat])

  return (
    <div className='flex flex-col'>
      {videos.map((video, idx)=>(
        video.type === 'video' && <VideoCard key={idx} {...video} />
      ))}
    </div>
  )
}

export default Videos
