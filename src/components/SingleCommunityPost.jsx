import React from 'react'
import { useParams } from 'react-router-dom'
import { Loading, VideoCard, Comments } from './'
import usePost from '../hooks/usePost'

const SingleCommunityPost = () => {
  const { id } = useParams()
  const { data: post, status, isError, isLoading } = usePost(id)
  if (isLoading) {
    return (<Loading classes="items-center" />)
  }
  if (isError) {
    return <span>Error</span>
  }
  return (
    <div className="bg-[#0f0f0f] text-white lg:mt-16 p-4">
      <div className="pb-3 border-gray-700 border-b lg:max-w-4xl lg:border-gray-400 lg:border lg:p-6 lg:rounded-2xl 4xl:max-w-6xl">
        <div className="flex items-center space-x-2">
          <img src={post.authorThumbnail ? `https:${post.authorThumbnail[1].url}` : ''} className="w-8 h-8 rounded-full" alt="" />
          <div className="flex flex-col">
            <span className='font-semibold'>{post.authorText}</span>
            <span className='font-semibold text-sm opacity-70'>{post.publishedTimeText}</span>
          </div>
        </div>

        <div className="">
          <p className={`text-lg my-4 text-clip w-full overflow-hidden cursor-pointer`} >
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
            <img src={post.attachment ? `${post.attachment.image[post.attachment.image.length - 1].url}` : ''} className="w-full my-4 max-w-xl" alt="" />
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
          </div>

        </div>
      </div>
      <Comments id={id} post="true" />
    </div>
  )
}

export default SingleCommunityPost
