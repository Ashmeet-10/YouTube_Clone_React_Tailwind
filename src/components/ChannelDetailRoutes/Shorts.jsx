import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../'
import useChannelShorts from '../../hooks/channelHooks/useChannelShorts'

const Shorts = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, status, isError, isLoading } = useChannelShorts(id)

  if (isLoading) {
    return (<Loading classes="items-start" />)
  }

  if (isError) {
    return <span>Error</span>
  }

  let shorts = data.data

  return (
    <div className='flex flex-wrap mt-6 text-white overflow-hidden'>
      {shorts?.map((short, idx) => (
        <div key={idx} className="relative w-1/3 p-0.5 cursor-pointer"
          onClick={() => navigate(`/shorts/${short.videoId}`)}
        >
          <img src={short.thumbnail ? `${short.thumbnail[0].url}` : ''} className="opacity-60 rounded-lg" alt="" />
          <div className="absolute left-2 bottom-3 text-sm z-[1]">
            <p className='font-semibold line-clamp-3'>{short.title}</p>
            <span>{short.viewCountText}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Shorts
