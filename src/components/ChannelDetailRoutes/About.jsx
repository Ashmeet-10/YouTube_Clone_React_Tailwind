import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loading } from '../'
import useChannelAbout from '../../hooks/channelHooks/useChannelAbout'

const About = () => {
  const { id } = useParams()
  const { data: about, status, isError, isLoading } = useChannelAbout(id)

  if (isLoading) {
    return (<Loading classes="items-start" />)
  }
  if (isError) {
    return <span>Error</span>
  }

  console.log(about)
  return (
    <div className='mt-4 px-4 pb-4'>
      About
      <p className='whitespace-pre-line text-sm font-normal leading-1 mt-4'>{about.description}</p>

      <div className="flex flex-col space-y-2 py-4">
        {about.links && about?.links.map((link, idx) => (
          <Link key={idx} to={link.link} className="text-sky-500">{link.title}</Link>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <span className='text-sm font-normal'>Joined {about.joinedDate}</span>
        <span className='text-sm font-normal'>{about.viewCount} views</span>
      </div>
    </div>
  )
}

export default About
