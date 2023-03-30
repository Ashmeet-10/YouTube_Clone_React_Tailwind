import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import Loading from './Loading'

const Comments = (props) => {
  const { id, setHideComments, shorts, commentRef, post, postCommentRef } = props
  const [comments, setComments] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setIsLoading(()=>true)
      let url = `comments?id=${id}`
      post ? url = `post/comments?id=${id}` : `comments?id=${id}`
      const data = await fetchFromAPI(url)
      setComments(data)
      console.log(data)
      setIsLoading(()=>false)
    })()
  }, [id])

  if(isLoading){
    return <Loading classes="h-[60vh]" />
  }

  return (
    <div className={`comment-section items-center relative pt-4 px-2 bg-[#0f0f0f] text-white ${(shorts||post)?'h-[60vh] overflow-y-auto':''}`}>
      <div className="flex justify-between items-center pb-4 border-gray-600 border-b-[1px]">
        <span className='text-xl font-bold blur-[0.5px] shadow-white drop-shadow-lg text-white'>Comments</span>
        <button
          onClick={() => {
            if (shorts) {
              commentRef.current.classList.add('translate-y-[100vh]')
              commentRef.current.classList.remove('translate-y-[40vh]')
            }
            else if(post){
              postCommentRef.current.classList.add('translate-y-[100vh]')
              postCommentRef.current.classList.remove('translate-y-[40vh]')
            }
            else {
              setHideComments(true)
            }
          }}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>

      <div className={`flex flex-col text-sm font-semibold opacity-90`}>
        {comments?.data?.map((comment, idx) => (
          <div key={idx} className="flex my-6">
            <div className="w-1/5">
              <img src={comment.authorThumbnail[1].url} className="w-12 h-12 rounded-full mr-4" alt="" />
            </div>
            <div className="flex flex-col w-4/5">
              <div className="flex items-center space-x-2 mb-2">
                <span>{comment.authorText}</span>
                <div className="h-1 w-1 bg-white rounded-full"></div>
                <span>{comment.publishedTimeText}</span>
              </div>
              <p className='text-clip'>{comment.textDisplay}</p>
              <div className="flex justify-between">
                <div className="">
                  <i className="fa-regular fa-thumbs-up opacity-80"></i>
                  <span className='ml-2 mr-4'>{comment.likesCount}</span>
                  <i className="fa-regular fa-thumbs-down opacity-80 -scale-x-100"></i>
                </div>
                <div className="">
                  <i className="fa-regular fa-comment-dots opacity-80"></i>
                  <span className='ml-2'>{comment.replyCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
