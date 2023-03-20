import React, { useEffect } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from './VideoCard'

const Videos = (props) => {
  const { videos, setVideos, selectedSuggCat, Category } = props
  useEffect(()=>{
    let url = Category ? `related?id=${Category}` : `search?query=${selectedSuggCat}`
    if (selectedSuggCat === 'Trending'){
      url='trending?geo=IN&type=now'
    }
    fetchFromAPI(url)
      .then((response) => {
        setVideos(response.data)
        console.log(response)
        console.log(videos)})
  },[selectedSuggCat, Category])

  return (
    <div className='flex flex-col'>
      {videos?.map((video, idx)=>(
        video.type === 'video' && <VideoCard key={idx} {...video} Category={Category} />
      ))}
    </div>
  )
}

export default Videos
