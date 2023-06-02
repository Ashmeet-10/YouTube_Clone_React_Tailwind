import React from 'react'
import { PlaylistCard, VideoCard, ChannelCard } from './'

const Videos = (props) => {
  const { videos, relatedVideoId } = props

  return (
    <div className={`flex flex-col max-w-[2800px] xs:grid xs:gap-4 xs:grid-cols-2 min-[860px]:grid-cols-3 lg:py-4 ${relatedVideoId ? 'lg:grid-cols-1' : 'xs:px-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 min-[2600px]:grid-cols-6 min-[2600px]:mx-auto'}`}>
      {videos?.map((video, idx) => (
        video.type !== 'shorts_listing' && video.type !== 'query_listing' && video.type !== 'video_listing' && <div key={idx}>
          {video.type === 'video' && <VideoCard {...video} relatedVideoId={relatedVideoId} />}
          {video.type === 'channel' && <ChannelCard {...video} />}
          {video.type === 'playlist' && <PlaylistCard {...video} search="true" relatedVideoId={relatedVideoId} />}
        </div>
      ))}
    </div>
  )
}

export default Videos
