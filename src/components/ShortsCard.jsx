import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { Comments, Description, Loading } from './'
import useVideoInfo from '../hooks/useVideoInfo'

const ShortsCard = () => {
  const { id } = useParams()   // shorts id
  const { data: shortsInfo, status, isError, isLoading } = useVideoInfo(id)
  const commentRef = useRef(null)
  const descRef = useRef(null)

  if (isLoading) {
    return (<Loading classes="h-[100vh] items-center" />)
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <div className='bg-[#212121] text-white relative'>
      <div className="fixed w-[100vw] h-[100vh]">
        <ReactPlayer width="100%" height="100%" playing url={`http://www.youtube.com/shorts/${id}-U`} className="react-player" controls />
        <div className="flex flex-col absolute right-4 bottom-16 space-y-2 z-10">
          <button><i className="fa-solid fa-thumbs-up w-12 h-12 rounded-full text-2xl p-2 flex justify-center items-center bg-white bg-opacity-20 backdrop-blur-md"></i></button>
          <span></span>
          <button><i className="fa-solid fa-thumbs-down w-12 h-12 rounded-full text-2xl p-2 flex justify-center items-center bg-white bg-opacity-20 backdrop-blur-md -scale-x-100"></i></button>
          <span>Dislike</span>
          <button
            onClick={() => {
              commentRef.current.classList.add('translate-y-[40vh]')
              commentRef.current.classList.remove('translate-y-[100vh]')
            }}
          >
            <i className="fa-regular fa-comment-dots w-12 h-12 rounded-full text-2xl p-2 flex justify-center items-center bg-white bg-opacity-20 backdrop-blur-md"></i>
          </button>
          <span></span>
          <button
            onClick={() => {
              descRef.current.classList.add('translate-y-[40vh]')
              descRef.current.classList.remove('translate-y-[100vh]')
            }}
          >
            <i className="fa-solid fa-bars-staggered w-12 h-12 rounded-full text-2xl p-2 flex justify-center items-center bg-white bg-opacity-20 backdrop-blur-md"></i>
          </button>
          <span>Desc...</span>
        </div>
      </div>

      <div ref={commentRef} className="fixed translate-y-[100vh] z-20 duration-1000 ease-in-out">
        <Comments id={id} shorts="true" commentRef={commentRef} />
      </div>
      <div ref={descRef} className="fixed translate-y-[100vh] z-20 duration-1000 ease-in-out">
        <Description id={shortsInfo.channelId} videoInfo={shortsInfo} shorts="true" descRef={descRef} />
      </div>
    </div>
  )
}

export default ShortsCard
