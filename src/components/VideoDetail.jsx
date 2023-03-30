import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { useNavigate } from 'react-router-dom'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { Videos, Comments, Description, Loading } from './'

const VideoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const [videos, setVideos] = useState([])
  const [videoInfo, setVideoInfo] = useState({})
  const [channelDetails, setChannelDetails] = useState({})
  const [hideDescription, setHideDescription] = useState(true)
  const [hideComments, setHideComments] = useState(true)
  const [comments, setComments] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setIsLoading(()=>true)
      const data1 = await fetchFromAPI(`video/info?id=${id}`)
      setVideoInfo(data1)
      console.log(data1)
      
      const data2 = await fetchFromAPI(`channel/about?id=${data1.channelId}`)
      setChannelDetails(data2)
      console.log(data2)
      setIsLoading(()=>false)

      const data3 = await fetchFromAPI(`comments?id=${id}`)
      setComments(data3)
      console.log(data3)
    })()
  }, [id])

  if(isLoading){
    return <Loading classes="h-[100vh] items-center"/>
  }

  return (
    <div className='bg-[#0f0f0f] text-white relative'>
      <div className="sticky z-10 top-0 left-0 video-container h-[50vh] border-gray-600 border-b-[1px]">
        <ReactPlayer width="100%" height="100%" playing url={`http://www.youtube.com/watch?v=${id}-U`} className="react-player" controls />
      </div>
      {hideDescription && hideComments && <div className="pt-3 px-4">
        <div className="videoTitle my-1 text-lg font-semibold">
          <p className='blur-[0.45px]'>{videoInfo.title}</p>
        </div>
        <div className="info flex space-x-3 text-xs font-semibold">
          <p className="opacity-60 whitespace-nowrap">{formatter.format(videoInfo.viewCount)} views</p>
          <p className="opacity-60 whitespace-nowrap">{videoInfo.uploadDate}</p>
          <pre onClick={() => setHideDescription(false)} className="font-sans font-bold bg-gradient-to-r from-white via-white to-black text-transparent bg-clip-text opacity-80 truncate leading-4 cursor-pointer">{videoInfo.description}</pre>
          <span onClick={() => setHideDescription(false)} className="cursor-pointer">...more</span>
        </div>
        <div className="flex items-center justify-between my-4 font-semibold text-white border-gray-600 border-b-[1px] pb-3">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate
            (`/channel/${channelDetails.channelId}`)}>
            <img src={channelDetails.avatar ? `${channelDetails.avatar[1].url}` : ''} className="w-10 h-10 rounded-full" alt="Icon" />
            <span className="text-sm line-clamp-1">{channelDetails.title}</span>
            <span className="text-xs opacity-60">{channelDetails.subscriberCountText}</span>
          </div>
          <button className='bg-white ml-2 text-black rounded-full px-3 py-2 text-sm'>Subscribe</button>
        </div>
      </div>}

      {!hideDescription && <Description id={videoInfo.channelId} videoInfo={videoInfo} setHideDescription={setHideDescription} />}

      <div className="comments px-2 pb-4 overflow-x-hidden">
        {hideComments && hideDescription && <div onClick={() => setHideComments(false)} className="flex justify-between cursor-pointer">
          <div className="flex items-center space-x-1 font-semibold opacity-90">
            <span>Comments</span>
            <div className="h-1 w-1 bg-white rounded-full"></div>
            <span>{comments.commentsCount}</span>
          </div>
          <button className="flex flex-col">
            <i className="fa-solid fa-angle-up"></i>
            <i className="fa-solid fa-angle-down"></i>
          </button>
        </div>}

        {hideComments === false && hideDescription && <Comments setHideComments={setHideComments} id={id} />}
      </div>

      {hideComments && hideDescription && <Videos videos={videos} setVideos={setVideos} Category={id} />}
    </div>
  )
}

export default VideoDetail
