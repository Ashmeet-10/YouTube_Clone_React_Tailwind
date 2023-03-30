import React from 'react'
import ChannelVideos from './ChannelVideos'
import FeaturedChannels from './FeaturedChannels'
import Shorts from './Shorts'

const Home = () => {
  return (
    <div className='py-6'>
      <span className='mx-4 mt-4'>Videos</span>
      <ChannelVideos/>
      <span className='mx-4 mt-4'>Channels</span>
      <FeaturedChannels/>
      <span className='mx-4 mt-4'>Shorts</span>
      <Shorts />
    </div>
  )
}

export default Home
