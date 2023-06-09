import React from 'react'
import { Loading } from './'
import useComments from '../hooks/useComments'
import usePostComments from '../hooks/usePostComments'

const Comments = (props) => {
  const { id, setHideComments, shorts, commentRef, post, postCommentRef } = props
  let commentsQuery
  if (post) {
    commentsQuery = usePostComments(id)
  }
  else {
    commentsQuery = useComments(id)
  }
  const { data: comments, status, isError, isLoading } = commentsQuery

  if (isLoading) {
    return <Loading classes="h-[60vh]" />
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <div className={`comment-section w-full scrollbar items-center relative pt-4 px-2 bg-[#0f0f0f] text-white ${(shorts) ? 'h-[60vh] overflow-y-auto lg:bg-[#383838]' : ''} ${post?'lg:max-w-4xl 4xl:max-w-6xl':''}`}>
      <div className="flex justify-between items-center pb-4 border-gray-600 border-b-[1px]">
        <span className='text-xl font-bold blur-[0.5px] shadow-white drop-shadow-lg text-white'>Comments</span>
        {!post && <button
          onClick={() => {
            if (shorts) {
              commentRef.current.classList.add('translate-y-[100vh]')
              commentRef.current.classList.remove('translate-y-[calc(40vh-3rem)]')
              commentRef.current.classList.remove('lg:translate-y-[15vh]')
            }
            else {
              setHideComments(true)
            }
          }}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>}
      </div>

      <div className={`flex flex-col text-sm font-medium opacity-90`}>
        {comments?.data?.map((comment, idx) => (
          <div key={idx} className="flex my-6">
            <div className="w-16">
              <img src={comment.authorThumbnail[1].url} className="w-12 h-12 rounded-full mr-4" alt="" />
            </div>
            <div className="flex flex-col w-11/12">
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
