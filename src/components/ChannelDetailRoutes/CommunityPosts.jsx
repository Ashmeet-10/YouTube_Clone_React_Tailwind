import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { VideoCard, Comments , Loading } from '../'
import useChannelPosts from '../../hooks/channelHooks/useChannelPosts'

const Community = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, status, isError, isLoading } = useChannelPosts(id)
  const ref = useRef(null)
  const [currPostId, setCurrPostId] = useState('')
  
  let obj = {}
  for(let i=0; i<30; i++){
    obj[`p${i}`] = 'line-clamp-4'
  }
  const [para, setPara] = useState(obj)

  if (isLoading) {
    return (<Loading classes="items-start" />)
  }

  if (isError) {
    return <span>Error</span>
  }

  let posts = data.data


  return (
    <div className='mt-4 p-4 space-y-4 relative'>
      {posts?.map((post, idx) => (
        <div key={idx} className="pb-3 border-gray-700 border-b lg:max-w-4xl lg:border-gray-400 lg:border lg:mx-auto lg:p-6 lg:rounded-2xl 4xl:max-w-6xl">
          <div className="flex items-center space-x-2">
            <img src={post.authorThumbnail ? `https:${post.authorThumbnail[1].url}` : ''} className="w-8 h-8 rounded-full" alt="" />
            <div className="flex flex-col">
              <span className='font-semibold'>{post.authorText}</span>
              <span className='font-semibold text-sm opacity-70'>{post.publishedTimeText}</span>
            </div>
          </div>

          <div className="">
            <p
              className={`text-lg my-4 text-clip w-full overflow-hidden cursor-pointer ${para[`p${idx}`]}`}
              onClick={() => {
                if (para[`p${idx}`] === 'line-clamp-4') {
                  setPara({ ...para, [`p${idx}`]: 'line-clamp-none' })
                }
                else {
                  setPara({ ...para, [`p${idx}`]: 'line-clamp-4' })
                }
              }}
            >
              {post.contentText}
            </p>

            {post.attachment && post.attachment.type === "poll" && <div className='flex flex-col my-4 space-y-2'>
              {post.attachment.choices.map((choice, idx) => (
                <div key={idx} className="border-white border-[1px] px-2 py-1">
                  <p>{choice}</p>
                </div>
              ))}
              <span>{post.attachment.totalVotes}</span>
            </div>}

            {post.attachment && post.attachment.type === "image" && <div>
              <img src={post.attachment ? `${post.attachment.image[post.attachment.image.length-1].url}` : ''} className="w-full my-4 max-w-xl" alt="" />
            </div>}

            {post.attachment && post.attachment.type === "video" && <div className='max-w-lg'>
              <VideoCard {...post.attachment} />
            </div>}

            <div className="flex justify-between">
              <div className="">
                <i className="fa-regular fa-thumbs-up opacity-80"></i>
                <span className='ml-2 mr-4'>{post.voteCountText}</span>
                <i className="fa-regular fa-thumbs-down opacity-80 -scale-x-100"></i>
              </div>
              <div
                onClick={() => {
                  navigate(`/post/${post.postId}`)
                  // setCurrPostId(() => post.postId)
                  // if (ref.current.classList.contains('translate-y-[100vh]')) {
                  //   ref.current.classList.remove('translate-y-[100vh]')
                  //   ref.current.classList.add('translate-y-[40vh]')
                  // }
                  // else {
                  //   ref.current.classList.add('translate-y-[100vh]')
                  //   ref.current.classList.remove('translate-y-[40vh]')
                  // }
                }}
                className="cursor-pointer"
              >
                <i className="fa-regular fa-comment-dots opacity-80"></i>
                <span className='ml-2'>{post.replyCount}</span>
              </div>
            </div>

          </div>
        </div>
      ))}
      <div ref={ref} className="top-0 left-0 fixed w-full z-10 translate-y-[100vh] duration-700 ease-in-out">
        <Comments id={currPostId} post="true" postCommentRef={ref} />
      </div>
    </div>
  )
}

export default Community
