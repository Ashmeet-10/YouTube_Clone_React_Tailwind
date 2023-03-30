import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import Comments from '../Comments'
import Loading from '../Loading'
import VideoCard from '../VideoCard'

const Community = () => {
  const { id } = useParams()
  const ref = useRef(null)
  const [posts, setPosts] = useState([])
  const [currPostId, setCurrPostId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [para, setPara] = useState({})
  useEffect(() => {
    (async () => {
      setIsLoading(() => true)
      const data = await fetchFromAPI(`channel/community?id=${id}`)
      setPosts(data.data)
      console.log(data)
      let i = 0
      let obj = {}
      data.data.forEach(() => {
        obj[`p${i++}`] = 'line-clamp-4'
      });
      setPara(obj)
      console.log(obj)
      setIsLoading(() => false)
    })()
  }, [id])

  if (isLoading) {
    return (<Loading classes="items-start" />)
  }

  return (
    <div className='mt-4 px-4 space-y-4 relative'>
      {posts?.map((post, idx) => (
        <div key={idx} className="pb-3 border-gray-700 border-b-[1px]">
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
              <img src={post.attachment ? `${post.attachment.image[0].url}` : ''} className="w-full my-4" alt="" />
            </div>}

            {post.attachment && post.attachment.type === "video" && <div>
              <VideoCard {...post.attachment} />
            </div>}

            <div className="flex justify-between">
              <div className="">
                <i className="fa-regular fa-thumbs-up opacity-80"></i>
                <span className='ml-2 mr-4'>{post.voteCountText}</span>
                <i className="fa-regular fa-thumbs-down opacity-80 -scale-x-100"></i>
              </div>
              <div
                onClick={()=>{
                  setCurrPostId(()=>post.postId)
                  if(ref.current.classList.contains('translate-y-[100vh]')){
                    ref.current.classList.remove('translate-y-[100vh]')
                    ref.current.classList.add('translate-y-[40vh]')
                  }
                  else{
                    ref.current.classList.add('translate-y-[100vh]')
                    ref.current.classList.remove('translate-y-[40vh]')

                  }
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
      <div ref={ref} className="top-0 left-0 fixed z-10 translate-y-[100vh] duration-700 ease-in-out">
        <Comments id={currPostId} post="true" postCommentRef={ref} />
      </div>
    </div>
  )
}

export default Community
