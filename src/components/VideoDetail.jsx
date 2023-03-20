import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import Videos from './Videos'

const VideoDetail = () => {
  const { id } = useParams()
  const [videos, setVideos] = useState([])
  const [videoInfo, setVideoInfo] = useState({})
  const [channelDetails, setChannelDetails] = useState({})
  const [hideDescription, setHideDescription] = useState(true)
  const [hideComments, setHideComments] = useState(true)
  const [comments, setComments] = useState({})

  useEffect(() => {
    (async () => {
      const data1 = await fetchFromAPI(`video/info?id=${id}`)
      setVideoInfo(data1)
      console.log(data1)

      const data2 = await fetchFromAPI(`channel/about?id=${data1.channelId}`)
      setChannelDetails(data2)
      console.log(data2)

      const data3 = await fetchFromAPI(`comments?id=${id}`)
      setComments(data3)
      console.log(data3)
    })()
  }, [id])

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
          <p className="opacity-60 whitespace-nowrap">{Number(videoInfo.viewCount).toLocaleString()} views</p>
          <p className="opacity-60 whitespace-nowrap">{videoInfo.uploadDate}</p>
          <pre onClick={() => setHideDescription(false)} className="font-sans font-bold bg-gradient-to-r from-white via-white to-black text-transparent bg-clip-text opacity-80 truncate leading-4 cursor-pointer">{videoInfo.description}</pre>
          <span onClick={() => setHideDescription(false)} className="cursor-pointer">...more</span>
        </div>
        <div className="flex items-center justify-between my-4 font-semibold text-white border-gray-600 border-b-[1px] pb-3">
          <div className="flex items-center space-x-3 cursor-pointer">
            {/* <img src={`${channelDetails.avatar[1].url}`} className="w-10 h-10 rounded-full" alt="Icon" /> */}
            {/* <img src={videoInfo.channelThumbnail[0].url} className="w-10 h-10 rounded-full" alt="Icon" /> */}
            <div className="w-10 h-10 rounded-full bg-orange-300"></div>
            <span className="text-sm">{channelDetails.title}</span>
            <span className="text-xs opacity-60">{channelDetails.subscriberCountText}</span>
          </div>
          <button className='bg-white text-black rounded-full px-3 py-2 text-sm'>Subscribe</button>
        </div>
      </div>}

      {hideDescription === false && <div className="description mt-4 relative px-4">
        <div className="flex justify-between items-center pb-4 border-gray-600 border-b-[1px]">
          <span className='text-xl font-bold blur-[0.5px] shadow-white drop-shadow-lg text-white'>Description</span>
          <button onClick={() => setHideDescription(true)}><i className="fa-solid fa-xmark text-2xl"></i></button>
        </div>

        <div className="">
          <div className="my-4 text-lg font-bold">
            <p className='blur-[0.5px]'>{videoInfo.title}</p>
          </div>
          <div className="flex items-center space-x-3 mb-6 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-orange-300"></div>
            <span className="text-sm font-bold opacity-80">{channelDetails.title}</span>
          </div>
          <div className="flex justify-evenly pb-3 font-bold blur-[0.5px] text-xl border-gray-600 border-b-[1px]">
            <p className="whitespace-nowrap">{Number(videoInfo.viewCount).toLocaleString()} views</p>
            <p className="whitespace-nowrap">{videoInfo.uploadDate}</p>
          </div>
        </div>

        <pre className="whitespace-pre-wrap mt-6 pb-10 leading-4 opacity-90 font-semibold font-sans text-sm border-gray-700 border-b-[6px]">{videoInfo.description}</pre>

        <div className="">
          <div className="flex items-center space-x-3 my-4">
            <div className="">
              <div className="w-16 h-16 rounded-full bg-orange-300"></div>
            </div>
            <div className="flex flex-col font-semibold opacity-90">
              <span className="text-lg">{channelDetails.title}</span>
              <span className="text-sm">{channelDetails.subscriberCountText} subscribers</span>
            </div>
          </div>
          <div className="flex justify-evenly py-2">
            <button className='rounded-full border border-white px-6 py-1 hover:bg-[#383838] hover:border-[#383838]'><i className="fa-regular fa-circle-play rounded-full"></i> Videos</button>
            <button className='rounded-full border border-white px-6 py-1 hover:bg-[#383838] hover:border-[#383838]'><i className="fa-regular fa-id-badge rounded-full"></i> About</button>
          </div>
        </div>
      </div>}

      <div className="comments px-4 pb-4">
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

        {hideComments === false && hideDescription && <div className="comment-section mt-4">
          <div className="flex justify-between items-center pb-4 border-gray-600 border-b-[1px]">
            <span className='text-xl font-bold blur-[0.5px] shadow-white drop-shadow-lg text-white'>Comments</span>
            <button onClick={() => setHideComments(true)}><i className="fa-solid fa-xmark text-2xl"></i></button>
          </div>

          <div className="flex flex-col text-sm font-semibold opacity-90">
            {comments?.data?.map((comment, idx) => (
              <div key={idx} className="flex my-6">
                <img src={comment.authorThumbnail[1].url} className="w-12 h-12 rounded-full mr-4" alt="" />
                <div className="flex flex-col">
                  <div className="flex justify-between mb-2">
                    <span>{comment.authorText}</span>
                    <span>{comment.publishedTimeText}</span>
                  </div>
                  <p className="">{comment.textDisplay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>}
      </div>
      
      <Videos videos={videos} setVideos={setVideos} Category={id} />
    </div>
  )
}

export default VideoDetail
