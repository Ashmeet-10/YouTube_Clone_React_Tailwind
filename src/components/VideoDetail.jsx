import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { Videos, Comments, Description, Loading } from './'
import useVideoInfo from '../hooks/useVideoInfo'
import useChannelAbout from '../hooks/channelHooks/useChannelAbout'
import useComments from '../hooks/useComments'
import useRelatedVideos from '../hooks/useRelatedVideos'

const VideoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: videoInfo, isError: isError1, isLoading: isLoading1 } = useVideoInfo(id)
  const { data: channelDetails, isError: isError2, isLoading: isLoading2 } = useChannelAbout(videoInfo?.channelId, !isLoading1)
  const { data: comments, isError: isError3, isLoading: isLoading3 } = useComments(id)
  const { data: relatedVideos, isError: isError4, isLoading: isLoading4, } = useRelatedVideos(id)
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const [hideDescription, setHideDescription] = useState(true)
  const [hideComments, setHideComments] = useState(true)

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
    return <Loading classes="h-[100vh] items-center" />
  }

  if (isError1 || isError2 || isError3 || isError4) {
    return <span>Error</span>
  }
  return (
    <div className='bg-[#0f0f0f] w-full text-white lg:flex lg:justify-between'>
      <div className="lg:w-[65%] lg:overflow-y-hidden">
        <div className="relative lg:h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar">
          <div className="sticky z-10 top-12 left-0 video-container border-gray-600 border-b-[1px] aspect-[10/6] sm:aspect-[13/6] md:relative lg:top-0">
            <ReactPlayer width="100%" height="100%" playing url={`http://www.youtube.com/watch?v=${id}-U`} className="react-player" controls />
          </div>
          {hideDescription && hideComments && <div className="pt-3 px-4">
            <div className="videoTitle my-1 text-lg font-semibold">
              <p className='blur-[0.45px]'>{videoInfo.title}</p>
            </div>
            <div className="info flex space-x-3 text-xs font-semibold">
              <p className="opacity-60 whitespace-nowrap">{formatter.format(videoInfo.viewCount)} views</p>
              <p className="opacity-60 whitespace-nowrap">{videoInfo.uploadDate}</p>
              <p onClick={() => setHideDescription(false)} className="font-bold bg-gradient-to-r from-white via-white to-gray-600 text-transparent bg-clip-text opacity-80 truncate leading-4 cursor-pointer">{videoInfo.description}</p>
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
            {hideComments && hideDescription && <div onClick={() => setHideComments(false)} className="flex justify-between cursor-pointer mb-4">
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
            {hideComments && hideDescription && <div className="lg:hidden">
              <Videos videos={relatedVideos.data} relatedVideoId={id} />
            </div>}
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-[35%] lg:ml-2 lg:overflow-hidden">
        <div className="lg:h-[calc(100vh-4rem)] lg:overflow-y-auto overflow-x-hidden scrollbar">
          <Videos videos={relatedVideos.data} relatedVideoId={id} />
        </div>
      </div>
    </div>
  )
}

export default VideoDetail
